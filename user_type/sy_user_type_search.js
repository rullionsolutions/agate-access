"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.SearchPage.clone({
    id              : "sy_user_type_search",
    entity_id       : "sy_user_type",
    title           : "Search for User Types",
    short_title     : "User Types"
});


module.exports.sections.addAll([
    { id: "main", type: "Search", entity: "sy_user_type" }
]);


module.exports.links.addAll([
    { id: "create", page_to: "sy_user_type_create" }
]);
