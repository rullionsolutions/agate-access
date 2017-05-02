"use strict";

var UI = require("lazuli-ui/index.js");
var Data = require("lazuli-data/index.js");


module.exports = UI.SearchPage.clone({
    id: "ac_user_search",
    entity_id: "ac_user",
    title: "Search for Users",
    short_title: "Users",
});


module.exports.sections.addAll([
    { id: "search", type: "Search", entity: "ac_user" }
]);


module.exports.links.addAll([
    { id: "create", page_to: "ac_user_create" }
]);


module.exports.defbind("addCriteria", "setupEnd", function () {
    this.sections.get("search").criteria.add(Data.entities.get("ac_user_role").getField("role_id").clone({
        id: "role_id", search_oper_list: "sy.search_oper_list_subent", auto_search_oper: "HA",
        sql_function: "EXISTS (SELECT 'X' FROM ac_user_role ZZ WHERE ZZ.user_id = A._key AND ZZ.role_id = {val})"
    }));
});
