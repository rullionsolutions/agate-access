/* global Packages */

"use strict";

var UI = require("lazuli-ui/index.js");
var Data = require("lazuli-data/index.js");
var IO = require("lazuli-io/index.js");
var Rhino = require("lazuli-rhino/index.js");


module.exports = UI.Page.clone({
    id              : "ac_pswd_change",
    entity_id       : "ac_user",
    title           : "Change Password",
    transactional   : true,
    security        : { all: true, guest: false },
    record_parameters: false
});


module.exports.sections.addAll([
    { id: "params", type: "FormParams" , title: "Old and New Passwords" }
]);


module.exports.defbind("setupStart", "setupStart", function () {
    this.primary_row = this.getTrans().getActiveRow("ac_user", this.session.user_id);
});


module.exports.defbind("setupEnd", "setupEnd", function () {
    var fieldset,
        user_row    = this.getPrimaryRow(),
        curr_pswd   = user_row.getField("password"  ).get(),
        salt        = user_row.getField("salt"      ).get(),
        iterations  = user_row.getField("iterations").getNumber(0),
        pswd_method = "md5";

    user_row.getField("pswd_last_upd").set("today");
    if (!iterations) {
        iterations  = parseInt(Rhino.app.iterations, 10);
        user_row.getField("iterations").set(iterations);
    }
    if (!curr_pswd) {
        curr_pswd   = user_row.getField("pswd_pbkdf").get();
        pswd_method = "pbkdf";
    }

    fieldset = this.sections.get("params").fieldset;
    fieldset.addFields([
        { id: "curr_password" , type: "Password", label: "Current Password"    , mandatory: true, regex_pattern: ".*", regex_label: undefined },
        { id: "new_password_1", type: "Password", label: "New Password"        , mandatory: true },
        { id: "new_password_2", type: "Password", label: "Re-type New Password", mandatory: true }
    ]);

    fieldset.getField("curr_password").validate = function () {
        var hashed_pswd;
        var unescaped_pswd;
        Data.Password.validate.call(this);
        if (this.isBlank()) {
            return;
        }

        if (pswd_method === "md5") {
            hashed_pswd = String(Packages.rsl.Lib.encryptMD5(this.get()));
            unescaped_pswd = hashed_pswd;
            this.debug(this, "MD5 hash: " + hashed_pswd + ", " + curr_pswd);
        } else if (pswd_method === "pbkdf") {
            hashed_pswd = String(Packages.rsl.Lib.encryptPBKDF(this.get(), salt, iterations));
            this.debug(this, "pbkdf hash: " + hashed_pswd + ", " + curr_pswd + ", " + salt + ", " + iterations);
            // keep this check for a while as users might have old password which were escaped
            unescaped_pswd = String(Packages.rsl.Lib.encryptPBKDF(IO.HttpServer.unescape(this.get()), salt, iterations));
        }

        if (hashed_pswd !== curr_pswd && unescaped_pswd !== curr_pswd) {
            this.messages.add({
                type: "E",
                text: "current password not correct",
            });
        }
    };

    fieldset.getField("new_password_2").validate = function () {
        Data.Password.validate.call(this);
        if (fieldset.getField("new_password_1").get() !== this.get()) {
            this.messages.add({ type: 'E', text: "new passwords must match" });
        }
    };

    fieldset.each(function (field) {
        field.validate();
    });
});


module.exports.defbind("updateAfterSections", "updateAfterSections", function (params) {
    var fieldset,
        new_password;

    fieldset     = this.sections.get("params").getFieldSet();
    new_password = fieldset.getField("new_password_1").get();
    if (params.page_button === "save") {
        if (fieldset.isValid()) {
            this.getPrimaryRow().setNewPassword(new_password);
        } else {
            delete params.page_button;
        }
    }
});


module.exports.defbind("success", "success", function () {
    this.session.force_password_change = false;
});
