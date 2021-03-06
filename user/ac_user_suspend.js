"use strict";

var UI = require("lazuli-ui/index.js");
var Data = require("lazuli-data/index.js");


module.exports = UI.Page.clone({
    id: "ac_user_suspend",
    entity_id: "ac_user",
    title: "Suspend",
    transactional: true,
    requires_key: true,
});


module.exports.defbind("updateSetAndSave", "updateAfterSections", function (params) {
    var user = this.getPrimaryRow();
    user.getField("status").set("S");
    params.page_button = "save";
});


module.exports.override("checkRecordSecurity", function (session, page_key, cached_record, allowed) {
    if (!cached_record) {
        cached_record = Data.entities.get("ac_user").getSecurityRecord(session, page_key);
    }
    if (!cached_record) {
        allowed.access = false;
        allowed.reason = "Access Denied";
    } else if (cached_record.getField("status").get() !== 'A' && cached_record.getField("status").get() !== 'L') {
        allowed.access = false;
        allowed.reason = "status is not 'Active' or 'Locked'";
    }
});
