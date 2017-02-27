"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "ac_session_display",
    entity_id       : "ac_session",
    title           : "Session",
    requires_key    : true
});


module.exports.tabs.addAll([
    { id: "details", label: "Details & Transactions" },
    { id: "visits" , label: "Visits & File Uploads" },
    { id: "emails" , label: "Emails, Exports & Imports" }
]);


module.exports.sections.addAll([
    { id: "display"  , type: "Display"  , tab: "details", entity: "ac_session" },
    { id: "txs"      , type: "ListQuery", tab: "details", entity: "ac_tx"    , link_field: "session_id" },
    { id: "visits"   , type: "ListQuery", tab: "visits" , entity: "ac_visit" , link_field: "session_id" },
    { id: "files"    , type: "ListQuery", tab: "visits" , entity: "ac_file"  , link_field: "session_id" },
    { id: "emails"   , type: "ListQuery", tab: "emails" , entity: "ac_email" , link_field: "session_id" },
    { id: "exports"  , type: "ListQuery", tab: "emails" , entity: "ac_export", link_field: "session_id" },
    { id: "imports"  , type: "ListQuery", tab: "emails" , entity: "ac_import", link_field: "session_id" }
]);


module.exports.links.addAll([
    { id: "close", page_to: "ac_session_close", page_key: "{page_key}" }
]);


module.exports.defbind("setupEnd", "setupEnd", function () {
    this.sections.get("txs").columns.get("user_id").visible = false;
});
