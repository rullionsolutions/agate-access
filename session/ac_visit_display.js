"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.Page.clone({
    id              : "ac_visit_display",
    entity_id       : "ac_visit",
    title           : "Visit",
    requires_key    : true
});


module.exports.sections.addAll([
    { id: "display", type: "Display", entity: "ac_visit" }
]);
