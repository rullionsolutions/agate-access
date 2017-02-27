"use strict";

var Core = require("lapis-core/index.js");
var UI = require("lazuli-ui/index.js");
var Data = require("lazuli-data/index.js");


module.exports = UI.Page.clone({
    id: "ac_pswd_reset",
    entity_id       : "ac_user",
    title: "Reset Password",
    transactional: true,
    requires_key: true,
    short_title: "Reset Password",
    record_parameters: false,
});


module.exports.sections.addAll([
    {
        id: "main",
        type: "FormParams",
        text: "Users cannot see others' current passwords under any circumstances, so this " +
            "page automatically <b>generates a random password to begin with</b>. When you click 'Save' " +
            "the password will be reset. Please inform the user of the new password.",
    },
]);


module.exports.defbind("setupFormAndButton", "setupEnd", function () {
    this.sections.get("main").fieldset.addField({
        id: "password",
        type: "Text",
        label: "New Password",
        regex_pattern: Data.Password.regex_pattern,
        regex_label: Data.Password.regex_label,
    });

    this.buttons.add({
        id: "generate",
        label: "Generate Random",
    });
});


module.exports.defbind("checkPassword", "updateBeforeSections", function (params) {
    if (params.page_button === "save" && !this.sections.get("main").fieldset.isValid()) {
        this.getTrans().messages.add({
            type: "E",
            text: "Password must be between 8 and 20 characters, including at least 1 digit, 1 uppercase, 1 lowercase and 1 special character",
        });
    }
});


module.exports.defbind("generateIfButtonClicked", "updateAfterSections", function (params) {
    if (params.page_button === "generate") {
        this.sections.get("main").fieldset.getField("password").set(Core.Format.getRandomString(8, { digits: true, }));
    }
});


module.exports.defbind("setPasswordAndActivate", "presave", function () {
    var new_password;
    new_password = this.sections.get("main").fieldset.getField("password").get();
    if (!new_password) {
        new_password = this.getPrimaryRow().getField("pswd_pbkdf").get();
    }
    this.getPrimaryRow().getField("status").set("A");           // activate account
    this.getPrimaryRow().getField("unlock_code").set("");
    this.getPrimaryRow().setNewPassword(new_password);
});
