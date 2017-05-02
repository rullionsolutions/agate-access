"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id: "sy_user_type_create",
    entity_id: "sy_user_type",
    title: "Create a User Type",
    transactional: true,
    short_title: "Create",
});


module.exports.sections.addAll([
    { id: "main" , type: "Create"    , entity: "sy_user_type" }
]);
