"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.Page.clone({
    id: "ac_user_delete",
    entity_id: "ac_user",
    title: "Delete this User",
    short_title: "Delete",
    transactional: true,
    requires_key: true,
    security: {
        all: false,
        sysmgr: true,
    },
});


module.exports.sections.addAll([
    { id: "delete", type: "Delete", entity: "ac_user" }
]);
