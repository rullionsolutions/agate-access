"use strict";

var Data = require("lazuli-data/index.js");
var SQL = require("lazuli-sql/index.js");
var Rhino = require("lazuli-rhino/index.js");
var Access = require("lazuli-access/index.js");
var menu2;
var menu3;


module.exports = Data.Area.clone({
    id              : "ac",
    title           : "Access",
    dependencies    : [ "sy" ],
    security        : { sysmgr: true },
    text_strings    : {},
    params          : {},
    glyphicon       : "icon-eye-open"
});

module.exports.params.valid_work_email_domains = [];
module.exports.valid_work_email_domains_error_msg = "the email address must be issued by " + Rhino.app.client.organization_name;
module.exports.valid_work_email_domains_scope = "soft";

menu2 = Access.MenuItem.addChild({
    label: "Access",
    modules: [ "ac" ],
    glyphicon: module.exports.glyphicon,
});
// menu2.addChild({ page: "sy_home" });


menu3 = menu2.addChild({ label: "Users and Sessions" });
menu3.addChild({ page: "ac_user_search" });
menu3.addChild({ page: "ac_session_search" });
menu3.addChild({ page: "ac_tx_search" });
menu3.addChild({ page: "ac_visit_search" });

menu3 = menu2.addChild({ label: "Emails and Files" });
menu3.addChild({ page: "ac_email_search" });
menu3.addChild({ page: "ac_file_search" });

menu3.addChild({ page: "ac_export_search" });
menu3.addChild({ page: "ac_import_search" });
menu3.addChild({ page: "ac_runtime_search" });


Access.roles.add(Access.Role.clone({
    id          : "user",
    title       : "User",
    priority    : -99,            // lowest priority - params will be overridden by all other roles
    description : "Any user must be given this role in order to access this environment. Security is then determined by other roles.",
    params      : {
        ping_mechanism              : true,
        help_article                : "help_other",
        password_reminder_period    : 7                // days
    }
}));


Access.roles.add(Access.Role.clone({
    id          : "sysmgr",
    title       : "System Manager",
    params      : {
        help_article                : "help_admin",
          list_advanced_mode        : true,            // Use advanced list mode
        search_advanced_mode        : true,            // Use advanced search mode
        multi_level_menu            : true,            // Use multi-level menus
        // RULS-016-1-7 - prevent concurrent logins
        // allow_multiple_concurrent   : true,            // Allow multiple concurrent sessions
        max_inactive_interval       : (60 * 30),       // Session time-out period in seconds
        password_change_period      : false            // Avoid having to change password
    }
}));


Access.roles.add(Access.Role.clone({
    id          : "rl_user_admin",
    title       : "User Admin",
    params      : {
        help_article            : "help_admin",
        list_advanced_mode      : true,            // Use advanced list mode
        search_advanced_mode    : true,            // Use advanced search mode
        multi_level_menu        : true             // Use multi-level menus
    }
}));


Access.roles.add(Access.Role.clone({
    id          : "guest",                    // Anonymous User
    title       : "Guest User",
    params      : {
        help_article                : "help_guest",
        is_guest                    : true,
        home_page_url               : "?page_id=home", // 'home' has skin of 'index.html' forcing log-in page
        allow_multiple_concurrent   : true             // Allow multiple concurrent sessions
    }
}));


Data.forms.add(Data.Form.clone({
    id      : "user_params",
    title   : "User Parameters",
    fields  : {}
}));


Rhino.App.defbind("ac_countActiveUsers", "dailyBatch", function (session) {
    var active_users = module.exports.countActiveUsers();
    session.messages.add({ id: "active_users_last_month", type: 'I',
        text: "Active Users within the Last Month: " + active_users, active_users: active_users });
});


module.exports.define("countActiveUsers", function () {
    var resultset,
        out;

    try {
        resultset = SQL.Connection.shared.executeQuery(
            "SELECT COUNT(DISTINCT(user_id)) FROM ac_session WHERE start_dttm >= DATE_SUB(now(), INTERVAL 1 MONTH)");
        if (resultset.next()) {
            out = resultset.getInt(1);
        }
    } catch (e) {
        this.report(e);
    } finally {
        SQL.Connection.shared.finishedWithResultSet(resultset);
    }
    return out;
});
