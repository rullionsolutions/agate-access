"use strict";

var Data = require("lazuli-data/index.js");
var SQL = require("lazuli-sql/index.js");
var IO = require("lazuli-io/index.js");
var Rhino = require("lazuli-rhino/index.js");


Rhino.App.defbind("loadDemoData_ac", "generateDemoData", function () {
    SQL.Connection.shared.loadSQLFile(IO.File.getModulePath(module) + "/user/demo_users.sql");
    Data.areas.get("ac").mapUserIds();
});


Data.areas.get("ac").define("mapUserIds", function () {
    var user_id_mappings = {
        abramspa: "managerh",
        adkinsle: "approver",
        conestev: "candidat",
        tilleyje: "managerr",
    };
    Data.entities.each(function (entity) {
        entity.each(function (field) {
            if (field.ref_entity === "ac_user") {
                Object.keys(user_id_mappings).forEach(function (from_id) {
                    SQL.Connection.shared.executeUpdate("UPDATE " + entity.table +
                        " SET " + field.id + " = " + SQL.Connection.escape(user_id_mappings[from_id]) +
                        " WHERE " + field.id + " = " + SQL.Connection.escape(from_id));
                });
            }
        });
    });
});
