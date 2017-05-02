"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.Page.clone({
    id: "ac_user_profile_update",
    entity_id: "ac_user",
    title: "Update your User Profile",
    short_title: "Update User Profile",
    transactional: true,
    security: { all: true, },
});


module.exports.sections.addAll([
    { id: "main"  , type: "Update"    , entity: "ac_user", title: "Update your Profile Details" },
    { id: "deleg1", type: "ListUpdate", entity: "ac_user_deleg", link_field: "delegater", tb_span: 6, title: "People You are Delegating to",
        text: "Select system users who can perform workflow tasks assigned to you, on your behalf" },
    { id: "deleg2", type: "ListUpdate", entity: "ac_user_deleg", link_field: "delegatee", tb_span: 6, title: "People Delegating to You", allow_add_rows: false, allow_delete_rows: false,
        text: "System users who have assigned their workflow tasks to you, choose whether or not to receive notification emails for them" }
]);


module.exports.defbind("setupStart", "setupStart", function () {
    this.primary_row = this.getTrans().getActiveRow("ac_user", this.session.user_id);
    this.primary_row.each(function (field) {
        field.editable = false;
        field.visible  = false;
    });
    this.primary_row.getField("email").visible  = true;
    this.primary_row.getField("email").editable = true;

    this.sections.get("main").setFieldSet(this.primary_row);
});


module.exports.defbind("setupEnd", "setupEnd", function () {
    this.sections.get("deleg1").columns.get("get_ntfcns").visible = false;          // would rather just make uneditable
});
