"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.ContextPage.clone({
    id              : "ac_user_context",
    entity_id       : "ac_user",
    title           : "User",
    requires_key    : true
});


module.exports.sections.addAll([
    { id: "display" , type: "Display", entity: "ac_user" }
]);


module.exports.links.addAll([
    { id: "update"  , page_to: "ac_user_update"       , page_key: "{page_key}" },
    { id: "pswd_rst", page_to: "ac_pswd_reset"        , page_key: "{page_key}" },
    { id: "delete"  , page_to: "ac_user_delete"       , page_key: "{page_key}" }
]);
