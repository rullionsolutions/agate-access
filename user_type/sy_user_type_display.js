"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id: "sy_user_type_display",
    entity_id: "sy_user_type",
    title: "User Type",
    requires_key: true,
});


module.exports.sections.addAll([
    { id: "main"    , type: "Display"      , entity: "sy_user_type" },
//    { id: "items"   , type: "ListQuery"    , entity: "sy_user_type_item", link_field: "list" },
    { id: "chg_hist", type: "ChangeHistory", entity: "sy_user_type" }
]);


module.exports.links.addAll([
    { id: "update", page_to: "sy_user_type_update", page_key: "{page_key}" },
    { id: "delete", page_to: "sy_user_type_delete", page_key: "{page_key}" }
]);
