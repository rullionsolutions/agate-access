"use strict";

var Data = require("lazuli-data/index.js");
var SQL = require("lazuli-sql/index.js");
var Rhino = require("lazuli-rhino/index.js");


module.exports = Data.Entity.clone({
    id              : "ac_visit",
    title           : "Visit",
    area            : "ac",
    primary_key     : "session_id,id",
    default_order   : "id,id",
    title_field     : "title",
    transactional   : false,
    display_page    : true,
    autocompleter   : true,
    parent_entity   : "ac_session",
    link_field      : "session_id",
    pack_condition  : "FALSE",
    data_volume_oom : 5,
});


module.exports.addFields([
    { id: "session_id"      , label: "Session"              , type: "Reference", editable: false, list_column: true, search_criterion: true, ref_entity: "ac_session" },
    { id: "id"              , label: "Id"                   , type: "Number"   , editable: false, list_column: true, search_criterion: true, decimal_digits: 0 },
    { id: "title"           , label: "Title"                , type: "Text"     , editable: false, list_column: true, search_criterion: true, data_length: 100 },
    { id: "date_time"       , label: "Date/time"            , type: "DateTime" , editable: false, list_column: true },
    { id: "page"            , label: "Page"                 , type: "Text"     , editable: false, data_length: 40, config_item: "pages" },
    { id: "page_key"        , label: "Page Key"             , type: "Text"     , editable: false, data_length: 80 },
    { id: "post_server"     , label: "Post Server (ms)"     , type: "Number"   , editable: false, list_column: true, decimal_digits: 0 },
    { id: "post_interval"   , label: "Post Interval (ms)"   , type: "Number"   , editable: false, list_column: true, decimal_digits: 0 },
    { id: "render_server"   , label: "Render Server (ms)"   , type: "Number"   , editable: false, decimal_digits: 0 },
    { id: "render_interval" , label: "Render Interval (ms)" , type: "Number"   , editable: false, list_column: true, decimal_digits: 0 },
    { id: "tx"              , label: "Transaction"          , type: "Reference", editable: false, ref_entity: "ac_tx" },
    { id: "parameters"      , label: "Parameters"           , type: "Textarea" , editable: false },
    { id: "errors"          , label: "Error Messages"       , type: "Textarea" , editable: false, list_column: true, separate_row: true },
    { id: "warnings"        , label: "Warning Messages"     , type: "Textarea" , editable: false, list_column: true, separate_row: true },
    { id: "messages"        , label: "Information Messages" , type: "Textarea" , editable: false, list_column: true, separate_row: true },
]);


module.exports.define("indexes", [ "session_id, id", "tx, id", "id" ]);


module.exports.override("archive", function (path, non_destructive, max_trans, max_session) {
    var rows;
    var filename = this.id + ".sql";
    var condition = "session_id <= " + max_session;

    Rhino.app.dumpMySQLDataThrowOnFail(path + filename, {
        tables: "ac_visit",
        where_clause: condition,
    });
    if (!non_destructive) {
        rows = SQL.Connection.shared.executeUpdate("DELETE FROM ac_visit WHERE " + condition);
        this.info("Archived " + rows + " rows");
    }
    return filename;
});
