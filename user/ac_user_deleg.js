"use strict";

var Core = require("lapis-core/index.js");
var Data = require("lazuli-data/index.js");

module.exports = Data.Entity.clone({
    id              : "ac_user_deleg",
    title           : "User Delegate",
    area            : "ac",
    primary_key     : "delegater,delegatee",
    default_order   : "delegater,delegatee",
    title_field     : "delegater",
    transactional   : true,
    parent_entity   : "ac_user",
    link_field      : "delegater",
    data_volume_oom : 3,
});


module.exports.addFields([
    { id: "delegater" , label: "Delegater", type: "Reference", list_column: true, search_criterion: true, ref_entity: "ac_user" },
    { id: "delegatee" , label: "Delegatee", type: "Reference", list_column: true, search_criterion: true, ref_entity: "ac_user" },
    { id: "get_ntfcns", label: "Receive Email Notifications?", type: "Boolean", list_column: true, default_val: "Y",
        description: "Delegatee to receive an email notification whenever a task is assigned to you, and to include your overdue tasks in their daily digest email" }
]);


module.exports.define("indexes", [ "delegatee,delegater" ]);


module.exports.defbind("notifyNewDelegatee", "presave", function () {
    if (this.action === "C" && !this.deleting) {
        this.page.addEmail({
            to_user: this.getField("delegatee").get(),
            delegater: Core.Format.convertNameFirstSpaceLast(this.getField("delegater").getText()),
            text_string: "ac.user_added_as_delegate",
        });
    }
});
