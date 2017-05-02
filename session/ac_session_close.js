"use strict";

var UI = require("lazuli-ui/index.js");
var Access = require("lazuli-access/index.js");


module.exports = UI.Page.clone({
    id: "ac_session_close",
    entity_id: "ac_session",
    title: "Close this Session",
});


module.exports.buttons.addAll([
    { id: "close", label: "Close this Session", css_class: "btn-warning" }
]);


module.exports.defbind("updateAfterSections", "updateAfterSections", function (params) {
    if (params.page_button === "close") {
        Access.Session.closeAll(null, this.page_key);
    }
});
