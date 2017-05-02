"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id: "ac_session_close_others",
    entity_id: "ac_session",
    title: "Close all other Sessions",
    short_title: "Close Others",
});


module.exports.buttons.addAll([
    { id: "close_others", label: "Close Other Sessions", css_class: "btn-warning" }
]);


module.exports.defbind("updateAfterSections", "updateAfterSections", function (params) {
    var count;
    if (params.page_button === "close_others") {
        count = this.session.closeAll(this.session.id);
        this.session.messages.add({
            id: 'W',
            text: count + " session(s) closed",
        });
        this.cancel();
    }
});
