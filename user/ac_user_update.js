"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.Page.clone({
    id: "ac_user_update",
    entity_id: "ac_user",
    title: "Update this User",
    transactional: true,
    requires_key: true,
    short_title: "Update",
});


module.exports.sections.addAll([
    { id: "update", type: "Update"    , entity: "ac_user" },
    { id: "roles" , type: "ListUpdate", entity: "ac_user_role" , link_field: "user_id"  , tb_span: 6, title: "Roles", add_row_field: "role_id" },
    { id: "deleg" , type: "ListUpdate", entity: "ac_user_deleg", link_field: "delegater", tb_span: 6, title: "Workflow Delegates" }
]);
