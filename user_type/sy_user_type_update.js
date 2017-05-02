"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id: "sy_user_type_update",
    entity_id: "sy_user_type",
    title: "Update this User Type",
    transactional: true,
    requires_key: true,
    short_title: "Update",
});


module.exports.sections.addAll([
    { id: "main" , type: "Update"    , entity: "sy_user_type" }
]);
