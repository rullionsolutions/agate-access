"use strict";

var Core = require("lapis-core/index.js");
var UI = require("lazuli-ui/index.js");
var Data = require("lazuli-data/index.js");


module.exports = UI.Page.clone({
    id              : "ac_user_request_create",
    entity_id       : "ac_user",
    page_key_entity : Data.entities.get("sy_user_type"),
    title           : "Request a User Account",
    transactional   : true,
    security        : { all: false, guest: true },
    exit_url_cancel : "guest.html?page_id=ac_user_request_choose",
    skin            : "guest.html"
});


module.exports.sections.addAll([
    { id: "main", type: "Create", entity: "ac_user", title: "Enter your details" }
]);

module.exports.define("doesEmailExist", function () {
    var email = this.getPrimaryRow().getField("email").get();
    return Data.entities.get("ac_user").doesEmailAlreadyExist(email);
});

module.exports.define("sendWarningEmail", function () {
    var email  = this.getPrimaryRow().getField("email").get(),
        query  = Data.entities.get("ac_user").getQuery(),
        spec = {},
        active_account = false;

    query.addCondition({
        column: "A.email",
        operator: "=",
        value: email,
    });

    while (query.next()) {
        if (query.getColumn("A.status").get() === "A" || query.getColumn("A.status").get() === "L") {
            active_account = true;
            break;
        }
    }

    if (active_account === false) {
        return;
    }

    spec.to_addr     = email;
    spec.text_string = "ac.duplicate_account_request";

    Data.entities.get("ac_email").create(spec).send();
});


module.exports.defbind("setupEnd", "setupEnd", function () {
    var user_row = this.getPrimaryRow();

    user_row.getField("id").visible = false;
    user_row.getField("name").visible = false;
    user_row.getField("status").visible = false;
    user_row.getField("status").set("R"); // requested
    user_row.getField("user_type").visible = false;
    user_row.getField("user_type").set(this.page_key);
    user_row.getField("password").visible = false;
    user_row.getField("unlock_code").visible = false;
    user_row.getField("expiry_date").visible = false;

    user_row.addFields([
        {
            id: "first_name",
            label: "First Name",
            css_reload: true,
            type: "Text",
            mandatory: true,
            sql_function: "NULL",
            data_length: 39,
        },
        {
            id: "last_name",
            label: "Last Name",
            css_reload: true,
            type: "Text",
            mandatory: true,
            sql_function: "NULL",
            data_length: 39,
        },
        {
            id: "confirm_email",
            label: "Re-type Email Address",
            type: "Email",
            mandatory: true,
            sql_function: "NULL",
            description: "just to confirm",
        },
    ]);

    user_row.moveTo("first_name", 2);
    user_row.moveTo("last_name", 3);
    user_row.moveTo("confirm_email", 8);

    user_row.getField("email_verification").editable = false;
});


// using that solution because the fields were directly added over the trans row
// in the original code
module.exports.defbind("toNameCase", "setupEnd", function () {
    var toNameCase = function () {
        var val = this.val;
        if (typeof val === "string") {
            val = Core.Format.toNameCase(val);
        }
        this.val = val;
    };
    var user_row = this.getPrimaryRow();
    user_row.getField("first_name").defbind("toNameCase", "afterTransChange", toNameCase);
    user_row.getField("last_name").defbind("toNameCase", "afterTransChange", toNameCase);
});


module.exports.defbind("generateId", "updateAfterSections", function (params) {
    var user_id,
        user_row,
        valid;

    if (params.page_button === "save") {
        user_row = this.getPrimaryRow();
        user_row.getField("name").set(user_row.getField("last_name").get() + ", " + user_row.getField("first_name").get());

        valid    = user_row.getField("name" ).isValid()
                && user_row.getField("email").isValid()
                && (user_row.getField("email").get() === user_row.getField("confirm_email").get());
        if (valid) {
            user_id = user_row.generateId(user_row.trans, user_row.getField("name").get(), user_row.getField("email").get());
            user_row.getField("id").set(user_id);
            if (this.doesEmailExist() && this.sections.get("main").fieldset.isValid()) {
                this.sendWarningEmail();
                this.exit_url_cancel = "index.html";
                params.page_button = "cancel";
            }
        } else {
            params.page_button = null;
            this.session.messages.add({
                type: 'W',
                text: "Please ensure your name and email address and valid, and that the email addresses match",
            });
        }
    }
});

module.exports.defbind("initiateWorkflow", "presave", function () {
    var user_type_row = Data.entities.get("sy_user_type").getRow(this.getPrimaryRow().getField("user_type").get());
    this.instantiateWorkflow(this.getPrimaryRow(), user_type_row.getField("wf_tmpl").get() || "ac_user_request", "wf_inst");
});
