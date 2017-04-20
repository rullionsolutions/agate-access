"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.SearchPage.clone({
    id              : "ac_visit_search",
    entity_id       : "ac_visit",
    title           : "Search for Visits",
    short_title     : "Visits"
});


module.exports.sections.addAll([
    { id: "search", type: "Search", entity: "ac_visit" }
]);
