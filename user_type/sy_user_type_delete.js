"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "sy_user_type_delete",
    entity_id       : "sy_user_type",
    title           : "Delete this User Type",
    transactional   : true,
    requires_key    : true,
    short_title     : "Delete",
    security        : { all: false, sysmgr: true }
});


module.exports.sections.addAll([
    { id: "main", type: "Delete", entity: "sy_user_type" }
]);
