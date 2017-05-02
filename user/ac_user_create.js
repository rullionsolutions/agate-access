"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.Page.clone({
    id: "ac_user_create",
    entity_id: "ac_user",
    title: "Create a User",
    short_title: "Create",
    transactional: true,
});


module.exports.sections.addAll([
    { id: "create", type: "Create"    , entity: "ac_user" },
    { id: "roles" , type: "ListUpdate", entity: "ac_user_role" , link_field: "user_id"  , tb_span: 6, title: "Roles", add_row_field: "role_id" },
    { id: "deleg" , type: "ListUpdate", entity: "ac_user_deleg", link_field: "delegater", tb_span: 6, title: "Workflow Delegates" }
]);


module.exports.defbind("presaveSetExitURL", "presave", function () {
    this.exit_url_save = this.getPrimaryRow().getDisplayURL();
});
