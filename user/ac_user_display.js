"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.Page.clone({
    id: "ac_user_display",
    entity_id: "ac_user",
    title: "User",
    requires_key: true,
});


module.exports.tabs.addAll([
    { id: "details" , label: "Details" },
    { id: "workflow", label: "Workflow" },
    { id: "session" , label: "Session History" },
    { id: "email"   , label: "Email History" }
]);


module.exports.sections.addAll([
    { id: "display" , type: "Display"      , tab: "details" , entity: "ac_user" },
    { id: "roles"   , type: "ListQuery"    , tab: "details" , entity: "ac_user_role" , link_field: "user_id", tb_span: 6, title: "Roles" },
    { id: "chg_hist", type: "ChangeHistory", tab: "details" , entity: "ac_user" },
    { id: "delegter", type: "ListQuery"    , tab: "workflow", entity: "ac_user_deleg"  , link_field: "delegater", tb_span: 6, title: "People this User is Delegating to" },
    { id: "delegtee", type: "ListQuery"    , tab: "workflow", entity: "ac_user_deleg"  , link_field: "delegatee", tb_span: 6, title: "People who are Delegating to this User" },
    { id: "sessions", type: "ListQuery"    , tab: "session" , entity: "ac_session"   , link_field: "user_id" },
    { id: "txs"     , type: "ListQuery"    , tab: "session" , entity: "ac_tx"        , link_field: "user_id" },
    { id: "emails"  , type: "ListQuery"    , tab: "email"   , entity: "ac_email"     , link_field: "to_user" }
]);


module.exports.links.addAll([
    { id: "update"   , page_to: "ac_user_update"       , page_key: "{page_key}" },
    { id: "pswd_rst" , page_to: "ac_pswd_reset"        , page_key: "{page_key}" },
    { id: "delete"   , page_to: "ac_user_delete"       , page_key: "{page_key}" },
    { id: "suspend"  , page_to: "ac_user_suspend"      , page_key: "{page_key}" },
    { id: "unsuspend", page_to: "ac_user_unsuspend"    , page_key: "{page_key}" }
]);
