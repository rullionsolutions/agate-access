"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.SearchPage.clone({
    id: "ac_session_search",
    entity_id: "ac_session",
    title: "Search for Sessions",
    short_title: "Sessions",
});


module.exports.sections.addAll([
    {
        id: "search",
        type: "Search",
        entity_id: "ac_session",
    },
]);


module.exports.links.addAll([
    {
        id: "close_others",
        page_to: "ac_session_close_others",
    },
]);


// Guest access no longer recorded as sessions in ac_session, so no need for this filter...
module.exports.defbind("filterOutGuestByDefault", "setupEnd", function () {
   this.sections.get("search").criteria.get("user_id").getFilter().setDefaults("guest", "NE");
});
