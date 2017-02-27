"use strict";


var Data = require("lazuli-data/index.js");

module.exports = Data.Entity.clone({
    id              : "ac_user_role",
    title           : "User Role",
    area            : "ac",
    primary_key     : "user_id,role_id",
    default_order   : "user_id,role_id",
    title_field     : "role_id",
    transactional   : true,
    parent_entity   : "ac_user",
    link_field      : "user_id",
    data_volume_oom : 3,
});


module.exports.addFields([
    { id: "user_id"   , label: "User"    , type: "Reference", list_column: true, search_criterion: true, mandatory: true, ref_entity: "ac_user" },
    { id: "role_id"   , label: "Role"    , type: "Text"     , list_column: true, search_criterion: true, mandatory: true, editable: false, data_length: 25, config_item: "roles", label_prop: "title" }
]);


module.exports.define("indexes", [ "role_id, user_id" ]);


module.exports.define("views", [ "select A.user_id, A.role_id, B.email from ac_user_role AS A INNER JOIN ac_user AS B ON A.user_id = B._key" ]);
