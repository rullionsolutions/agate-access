"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.Page.clone({
    id              : "ac_user_request_approve",
    entity_id       : "ac_user",
    title           : "Approve or Reject this User Account Request",
    short_title     : "Approve / Reject",
    transactional   : true,
    requires_key    : true,
    workflow_only   : true,
    wf_type         : "user_request",
    test_key_condition: "status = 'R'"      // requested
});


module.exports.sections.addAll([
    { id: "main", type: "Display", entity: "ac_user" }
]);


module.exports.outcomes = {
    approved: { label: "Approve", css_class: "btn-success" },
    rejected: { label: "Reject", css_class: "btn-danger" }
};


module.exports.defbind("presaveSetStatus", "presave", function () {
    if (this.outcome_id === "rejected") {
        this.getPrimaryRow().getField("status").set("J");                       // rejected
    }
});


module.exports.links.addAll([
    { id: "approve", page_to: "ac_user_request_approve", page_key: "{page_key}" }
]);
