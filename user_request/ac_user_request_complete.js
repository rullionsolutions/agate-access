"use strict";


var UI = require("lazuli-ui/index.js");

module.exports = UI.Page.clone({
    id: "ac_user_request_complete",
    entity_id: "ac_user",
    title: "Complete this User Account Request",
    transactional: true,
    requires_key: true,
    workflow_only: true,
    wf_type: "user_request",
    test_key_condition: "status = 'R'",      // requested
});


module.exports.defbind("setupEnd", "setupEnd", function () {
    this.getPrimaryRow().getField("status").set("L");                       // locked
    this.getPrimaryRow().addRoles();
    this.getPrimaryRow().setupUnlock({}, this.getTrans());
});
