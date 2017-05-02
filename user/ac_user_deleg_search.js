"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.Page.clone({
    id: "ac_user_deleg_search",
    entity_id: "ac_user_deleg",
    title: "Search for User Delegates",
    short_title: "User Roles",
});


module.exports.sections.addAll([
    { id: "search", type: "Search", entity: "ac_user_deleg" }
]);
