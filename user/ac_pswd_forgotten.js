"use strict";

var UI = require("lazuli-ui/index.js");
var Data = require("lazuli-data/index.js");


module.exports = UI.Page.clone({
    id              : "ac_pswd_forgotten",
    entity_id       : "ac_user",
    title           : "Forgotten Password?",
    transactional   : false,                // avoid setting page.primary_row
    security        : { all: false, guest: true },
    skin            : "guest.html",
    reset_page      : "ac_pswd_unlock",
    text_string     : "ac.forgotten_password_email",
    exit_url        : "index.html",
    pswd_send       : "pswd_forgotten_send"
});


module.exports.sections.addAll([
    { id: "params", type: "FormParams", title: "Send a Reset Email",
        text: "Please enter your email address here, and if it is linked to a user account in the system, " +
            "we will send you an email containing a link for you to reset your password" }
]);


module.exports.buttons.addAll([
    { id: "send", label: "Send", main_button: true },
    { id: "login", label: "Return to Log-in", visible: false }
]);


module.exports.defbind("setupEnd", "setupEnd", function () {
    this.sections.get("params").fieldset.addFields([
        { id: "email_addr", type: "Email", label: "Your email address", mandatory: true, update_length: 40 }
    ]);
});


module.exports.defbind("updateAfterSections", "updateAfterSections", function (params) {
    var fieldset,
        query,
        user_row,
        msg_obj;

    if (params.page_button === "login") {
        this.redirect_url = this.exit_url;
        this.active = false;
    } else if (params.page_button === "send") {
        fieldset = this.sections.get("params").getFieldSet();
        if (fieldset.getField("email_addr").isValid()) {
            query = Data.entities.get("ac_user").getQuery();
            query.addCondition({ full_condition: "status IN ( 'A', 'L' )" });        // active or locked user accounts
            query.addCondition({ column: "email", operator: "=", value: fieldset.getField("email_addr").get() });
            if (query.next()) {
                if (query.next()) {
                    this.session.messages.add({
                        type: 'E',
                        text: "Multiple user accounts have this email address",
                    });
                } else {
                    try {
                        user_row = query.getRow(this.getTrans());
                        user_row.setupUnlock({ session: this.session, reset_page: this.reset_page, text_string: this.text_string });
                        this.getTrans().save();
                        // this.redirect_url = "?page_id=guest_home";
                        this.buttons.get("send" ).visible = false;
                        this.buttons.get("login").visible = true;
                        msg_obj = Data.areas.get("ac").text_strings[this.pswd_send];
                        this.session.messages.add({ type: msg_obj.type, text: msg_obj.text });
                    } catch (e) {
                        this.report(e);
                        this.session.messages.add({ type: "E", text: "An error occurred, please contact Support" });
                    }
                }
            } else {
                this.buttons.get("send").visible = false;
                this.buttons.get("login").visible = true;
                msg_obj = Data.areas.get("ac").text_strings[this.pswd_send];
                this.session.messages.add({ type: msg_obj.type, text: msg_obj.text, });
            }
            query.reset();
        } else {
            this.session.messages.add({ type: "E", text: "Invalid email address" });
        }
    }
});
