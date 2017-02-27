"use strict";

var UI = require("lazuli-ui/index.js");
var Data = require("lazuli-data/index.js");


module.exports = UI.Page.clone({
    id              : "ac_pswd_unlock",
    entity_id       : "ac_user",
    title           : "Reset Password",
    transactional   : false,                // avoid setting page.primary_row
    security        : { all: false, guest: true },
    skin            : "guest.html",
//    exit_url_save   : "index.html",
    exit_url_cancel : "index.html",
    record_parameters: false
});


module.exports.sections.addAll([
    { id: "params", type: "FormParams" , title: "New Password",
        text: "Please choose a new password here, and re-type it for confirmation" }
]);


module.exports.buttons.addAll([
    { id: "save" , label: "Save", main_button: true, css_class: "btn-primary" },
    { id: "login", label: "Cancel" }
]);


module.exports.defbind("setupEnd", "setupEnd", function () {
    var fieldset = this.sections.get("params").fieldset;
    fieldset.addFields([
        { id: "new_password_1", type: "Password", label: "New Password"        , mandatory: true },
        { id: "new_password_2", type: "Password", label: "Re-type New Password", mandatory: true }
    ]);

    fieldset.getField("new_password_2").validate = function () {
        Data.Password.validate.call(this);
        if (fieldset.getField("new_password_1").get() !== this.get()) {
            this.messages.add({ type: 'E', text: "new passwords must match" });
        }
    };
});


module.exports.defbind("updateAfterSections", "updateAfterSections", function (params) {
    var fieldset,
        user_row;

    this.param_user_id     = params.user_id     || this.param_user_id;          // these only passed in 1st
    this.param_unlock_code = params.unlock_code || this.param_unlock_code;      // post

    this.debug(this, "update(): " + params.user_id + ", " + this.param_user_id + ", " + params.unlock_code + ", " + this.param_unlock_code);

    if (params.page_button === "login") {
        this.cancel();
        return;
    }

    if (!this.param_user_id || !this.param_unlock_code) { //         url parameters not present
        this.session.messages.add({ type: "E", text: "This link is invalid, " +
            "perhaps because it has been split by a line-break in your email program? Please check the link " +
            "in your email program, and contact RSL Support if you still have a problem." });
        this.page_state = 'error_0';
    } else {                                              // check if url parameters are valid
        user_row = Data.entities.get("ac_user").getRow(this.param_user_id);
        if (user_row.checkUnlockCode(this.param_unlock_code)) {
            this.session.messages.add({ type: "E", text: "This link is invalid, " +
                "perhaps because you have already used this link to reset your password? " +
                "If so, and you need to set your password again, please use the 'Forgotten Password' button " +
                "on the log-in page to perform the unlock process again." });
            this.page_state = 'error_0';
        } else {
            this.page_state = 'good';
        }
    }
    if (this.page_state === 'good') {
        fieldset = this.sections.get("params").getFieldSet();
        fieldset.getField("new_password_1").validate();     // needed because fields are not validated until set() at least once
        fieldset.getField("new_password_2").validate();

        if (params.page_button === "save" && fieldset.isValid()) {
            try {
                user_row = this.getTrans().getActiveRow("ac_user", this.param_user_id);
                user_row.unlock(this.param_unlock_code, fieldset.getField("new_password_1").get());
                this.getTrans().save();
                this.session.messages.add({ type: "I", text: "Your password is updated. Please click the button to log-in" });
                this.buttons.get("login").label = "Return to Log-in";
                this.page_state = 'done';
            } catch (e) {
                this.session.messages.add({ type: "E", text: e });
                this.page_state = 'error_1';
            }
        }
    }

    this.sections.get("params").visible = (this.page_state === 'good' || this.page_state === 'error_1');
    this.buttons.get("save"  ).visible = (this.page_state === 'good');
});
