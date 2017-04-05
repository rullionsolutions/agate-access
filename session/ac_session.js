"use strict";

var Data = require("lazuli-data/index.js");


module.exports = Data.Entity.clone({
    id              : "ac_session",
    title           : "Session",
    area            : "ac",
    primary_key     : "id",
    default_order   : "id,id",
    title_field     : "start_dttm",
    transactional   : false,
    display_page    : true,
    autocompleter   : true,
    data_volume_oom : 5,
});


module.exports.addFields([
    { id: "id"          , label: "Id"                , type: "Number"   , editable: false, list_column: true, search_criterion: true, decimal_digits: 0, auto_generate: true, },
    { id: "status"      , label: "Status"            , type: "Option"   , editable: false, list_column: true, search_criterion: true, list: "ac.session_status" },
    { id: "start_dttm"  , label: "Start Date/time"   , type: "DateTime" , editable: false, list_column: true, search_criterion: true },
    { id: "end_dttm"    , label: "End Date/time"     , type: "DateTime" , editable: false, list_column: true },
    { id: "user_id"     , label: "User"              , type: "Reference", editable: false, list_column: true, search_criterion: true, ref_entity: "ac_user" },
    { id: "page"        , label: "Page"              , type: "Text"     , editable: false, visible: false, data_length: 40, config_item: "pages" },
    {
        id: "lb_server",
        label: "LB Server ID",
        type: "Text",
        editable: false,
        data_length: 255,
    },
    { id: "server_ident", label: "Server Ident"      , type: "Text"     , editable: false, data_length: 255 },
    { id: "stat_archive", label: "Status Pre-Archive", type: "Option"   , editable: false, list: "ac.session_status" },
    { id: "user_agent"  , label: "User Agent"        , type: "Text"     , editable: false, data_length: 255 },
    { id: "chameleon"   , label: "Chameleon User"    , type: "Reference", editable: false, list_column: true, ref_entity: "ac_user" },
    { id: "runtime"     , label: "Runtime"           , type: "Reference", editable: false, ref_entity: "sy_runtime" }
]);


module.exports.define("indexes", [ "user_id, id", "id", "status", "runtime" ]);


module.exports.getField("status").override("getUneditableCSSStyle", function () {
    if (this.get() === "A" || this.get() === "S") {        // active, successful
        return "color: green";
    }                            // closed, etc
    return "color: orange";
});


module.exports.getField("chameleon").override("getUneditableCSSStyle", function () {
    return "color: red; font-weight: bold";
});
