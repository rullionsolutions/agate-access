"use strict";

var Data = require("lazuli-data/index.js");
var Rhino = require("lazuli-rhino/index.js");
var SQL = require("lazuli-sql/index.js");


module.exports = Data.Entity.clone({
    id: "sy_user_type",
    title: "User Type",
    area: "sy",
    display_page: true,
    transactional: true,
    title_field: "title",
    default_order: "title",
    primary_key: "area,id",
    data_volume_oom: 1,
});


module.exports.addFields([
    { id: "area"       , label: "Area"             , type: "Option", data_length: 2 , mandatory: true, search_criterion: true, list_column: true, collection_id: "areas" },
    { id: "id"         , label: "Id"               , type: "Text", data_length: 25, mandatory: true, list_column: true },
    { id: "title"      , label: "Title"            , type: "Text", data_length: 80, mandatory: true, search_criterion: true, list_column: true },
    { id: "roles"      , label: "Initial Role(s)"  , type: "Text", data_length: 255, mandatory: true, list_column: true, description: "comma-separated list, including 'user'" },
    { id: "text_string", label: "Account Initiation Text String", type: "Text", data_length: 40 },
    { id: "reset_page" , label: "Account Initiation Reset Page" , type: "Text", data_length: 40, collection_id: "pages" },
    { id: "wf_tmpl"    , label: "Workflow Template"             , type: "Text", data_length: 80, collection_id: "wf_templates" },
    { id: "unused_expiry_period", label: "Unused Expiry Period" , type: "Text", regex_pattern: "^[0-9]{1,4}(days|weeks|months|years)$", regex_label: "Period after which inactive user accounts will be deactivated" }
// Don't want to offer this alternative - passwords should only be set once user account is approved, partly for security reasons
//    { id: "incl_pswd"  , label: "Include Password?"             , type: "Boolean", default_val: "Y", description: "If you wish the new user to set their password on the request please tick this box" },
//    { id: "url"        , label: "Link to Request Page"          , type: "URL", icon: "style/Axialis/Png/16x16/Arrow2 Right.png" },
]);


Rhino.app.defbind("suspendExpiredUsers", "dailyBatch", function (session) {
    var user_row,
        user_role_query = module.exports.getQuery(),
        user_resultset,
        trans,
        expiry_period,
        user_type,
        expiry_date;

    user_role_query.addCondition({ column: "A.unused_expiry_period", operator: "NN", value: "" });

    while (user_role_query.next()) {
        expiry_period = user_role_query.getColumn("A.unused_expiry_period").get();
        user_type     = user_role_query.getColumn("A._key").get();
        expiry_date   = Date.parse("now+-" + expiry_period).internal();
        try {
            user_resultset = SQL.Connection.shared.executeQuery("SELECT S.user_id as user_id, MAX(S.start_dttm) AS last_login FROM ac_session S, ac_user U "
                + "WHERE U._key = S.user_id AND U.status = 'A' AND  U.user_type = " + SQL.Connection.escape(user_type) + " GROUP BY S.user_id HAVING last_login < " + SQL.Connection.escape(expiry_date));
            while (user_resultset.next()) {
                trans = session.getNewTrans();
                user_row = trans.getActiveRow("ac_user", SQL.Connection.getColumnString(user_resultset, "user_id"));
                user_row.getField("status").set("S");
                if (trans.isActive() && trans.isModified()) {
                    trans.save();
                } else {
                    trans.cancel();
                }
            }
        } catch (e) {
            this.report(e);
        } finally {
            SQL.Connection.shared.finishedWithResultSet(user_resultset);
            if (trans && trans.isActive()) {
                trans.cancel();
            }
        }
    }
    user_role_query.reset();
});
