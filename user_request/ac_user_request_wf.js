"use strict";


x.Workflow.templates.ac_user_request = x.Workflow.clone({
    id: "ac_user_request",
    type: "user_request",
    title: "User Request",
    entity_id: "ac_user",
    first_node_id: "create"
});


x.Workflow.templates.ac_user_request.nodes.add({
    id: "create"
}).transitions.addAll([
    { outcome_id: "save", to_node_id: "approve" }
]);


x.Workflow.templates.ac_user_request.nodes.add({
    id: "approve",
    page_id: "ac_user_request_approve",
    actor_id: "approver",
    show_in_taskbar: true,
    days_from_activation_to_due: 1,
    days_from_activation_to_reminder: 2
}).transitions.addAll([
    { outcome_id: "approved", to_node_id: "complete" },
    { outcome_id: "rejected" }        /* no to_node_id means end WF */
]);


x.Workflow.templates.ac_user_request.nodes.add({
    id: "complete",
    page_id: "ac_user_request_complete",
    automatic: true
});


x.Workflow.templates.ac_user_request.actors.add({
    id: "approver",
    label: "Approver",
    getUserId: function(/*node*/) {
        return Data.entities.get("ac_user").user_request_approver;
    }
});
