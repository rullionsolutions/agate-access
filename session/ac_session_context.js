"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.ContextPage.clone({
    id: "ac_session_context",
    entity_id: "ac_session",
    title: "Session",
    requires_key: true,
});


module.exports.sections.addAll([
    { id: "display"  , type: "Display"  , entity: "ac_session" },
    { id: "txs"      , type: "ListQuery", entity: "ac_tx"    , link_field: "session_id" }
]);


module.exports.defbind("updateColumnVisibility", "setupEnd", function () {
    this.sections.get("txs").columns.get("start_point").visible = false;
    this.sections.get("txs").columns.get("user_id").visible = false;
    this.sections.get("txs").columns.get("row_count").visible = false;
    this.sections.get("txs").columns.get("outcome").visible = false;
});
