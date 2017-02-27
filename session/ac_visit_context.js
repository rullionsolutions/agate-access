"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.ContextPage.clone({
    id              : "ac_visit_context",
    entity_id       : "ac_visit",
    title           : "Visit",
    requires_key    : true
});


module.exports.sections.addAll([
    { id: "display", type: "Display", entity: "ac_visit" }
]);
