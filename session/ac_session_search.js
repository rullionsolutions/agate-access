"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.SearchPage.clone({
    id            : "ac_session_search",
    entity_id     : "ac_session",
    title         : "Search for Sessions",
    short_title   : "Sessions"
});


module.exports.sections.addAll([
    { id: "search", type: "Search", entity: "ac_session", title: "Search for Session" }
]);


module.exports.links.addAll([
    { id: "close_others", page_to: "ac_session_close_others" }
]);

// Guest access no longer recorded as sessions in ac_session, so no need for this filter...
// UI.pages.get(ac_session_search).setupCall = function () {
//    var filter = this.sections.get("search").filters.get("user_id_0");
//    filter.oper_field.dflt_search_oper = "NE";            // not equal to
//    filter.filt_field.dflt_search_val  = "guest";        // guest
//    filter.reset();
// };
