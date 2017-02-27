"use strict";

var UI = require("lazuli-ui/index.js");
var Data = require("lazuli-data/index.js");


module.exports = UI.Page.clone({
    id              : "ac_user_request_choose",
    entity_id       : "ac_user",
    title           : "Request a User Account",
    security        : { all: false, guest: true },
    skin            : "guest.html"
});


module.exports.sections.addAll([
    { id: "types", type: "Tiles", entity: "sy_user_type", title: "Choose the type of user account you think you need",
        text: "Please choose which type of user account you think is appropriate for your needs, " +
            "then enter the details requested, and your requested will be submitted for approval" }
]);


module.exports.buttons.addAll([
//    { id: "save" , label: "Save", main_button: true },
    { id: "login", label: "Return to Log-in" }
]);


module.exports.defbind("setupEnd", "setupEnd", function () {
    this.sections.get("types").query.addCondition({
        full_condition: Data.entities.get("ac_user").user_request_types_allowed,
    });
    this.sections.get("types").record.renderTile = function (parent_elem, render_opts) {
        var anchor_elem = parent_elem.addChild("a", this.id + "_" + this.getKey(), "btn css_tile");
        anchor_elem.attribute("href", UI.pages.get("ac_user_request_create").getSimpleURL(this.getKey()));
        this.getField(this.tile_field || this.title_field).render(anchor_elem, render_opts);
    };
});


module.exports.defbind("updateAfterSections", "updateAfterSections", function (params) {
    if (params.page_button === "login") {
        this.redirect_url = "index.html";
        this.active = false;
    }
});
