/* global Packages */

"use strict";

var Core = require("lapis-core/index.js");
var Data = require("lazuli-data/index.js");
var SQL = require("lazuli-sql/index.js");
var Rhino = require("lazuli-rhino/index.js");
var UI = require("lazuli-ui/index.js");
var IO = require("lazuli-io/index.js");


module.exports = Data.Entity.clone({
    id: "ac_user",
    title: "User",
    area: "ac",
    primary_key: "id",                // Specified like this to avoid issues with multi-part keys from changing sequence
    default_order: "name",
    title_field: "name",
    transactional: true,
    display_page: true,
    autocompleter: true,
    security: { rl_user_admin: true },
    data_volume_oom: 3,
    user_request_types_allowed: "_key IN ( 'rm.perm', 'vr.hiring_mgr' )",
    allow_duplicate_email_addresses: true,
});

module.exports.register("unlockAccount");

module.exports.addFields([
    { id: "id"               , label: "Id"         , type: "Text", data_length: 12, mandatory: true, search_criterion: true, list_column: true },
    {
        id: "name",
        label: "Name",
        type: "Text",
        data_length: 80,
        mandatory: true,
        search_criterion: true,
        list_column: true,
        description: "as Surname, Firstname",
        sort_seq: 1,
        helper_text: "Surname, Firstname",
        css_reload: true,
    },
    { id: "status"           , label: "Status"     , type: "Option", list: "ac.user_status", mandatory: true, search_criterion: true, list_column: true, default_val: "A", editable: false },
    { id: "user_type"        , label: "User Type"  , type: "Reference", mandatory: true, search_criterion: true, list_column: true, ref_entity: "sy_user_type" },
    { id: "password"         , label: "Password"   , type: "Text", visible: false, data_length: 80, update_length: 20 },
    { id: "email"            , label: "E-mail Address", type: "Email", mandatory: true, list_column: true },
    { id: "email_verification", label: "Email Verification", type: "Option", list: "ac.email_verification", default_val: "E" },
    { id: "unlock_code"      , label: "Unlock Code", type: "Text", data_length: 20, editable: false },
    { id: "expiry_date"      , label: "Expiry Date", type: "Date", list_column: true },
    { id: "pswd_last_upd"    , label: "Password Last Updated", type: "Date", editable: false },
    { id: "pswd_pbkdf"       , label: "Password"   , type: "Text", visible: false, data_length: 128, update_length: 20 },
    { id: "salt"             , label: "Salt"       , type: "Text", visible: false, data_length: 128 },
    { id: "iterations"       , label: "Iterations" , type: "Number", visible: false },
    // { id: "wf_inst"          , label: "Workflow Instance", type: "Reference", editable: false, ref_entity: "ac_wf_inst" }
]);


module.exports.define("views", [
    "select (cast( id as char charset utf8) collate utf8_bin) AS user_id, name, password, pswd_pbkdf, salt, iterations, email from ac_user where status = 'A' and ifnull(expiry_date, '9999-12-31') > now()"
]);


module.exports.getField("name").defbind("toNameCase", "afterTransChange", function (oldVal) {
    var val = this.val;
    if (typeof val === "string") {
        val = Core.Format.toNameCase(val);
    }
    this.val = val;
});


module.exports.override("obfuscate", function () {
    var prefix = "00000000",
        query,
        user_id,
        id = 1;

    Data.Entity.obfuscate.call(this);
    query = Data.entities.ac_user.getQuery();
    query.addCondition({ column: "A.user_type", operator: "<>", value: "ac.core" });

    while (query.next()) {
        user_id = String(id);
        user_id = prefix.substr(0, (8 - user_id.length)) + user_id;
        SQL.Connection.shared.executeUpdate("UPDATE ac_user SET id = " + SQL.Connection.escape(user_id) +
            ", email = " + SQL.Connection.escape(user_id + "@user.com") + ", name = 'User, " + user_id +
            "' WHERE _key = " + SQL.Connection.escape(query.getColumn("A._key").get()));
        id += 1;
    }
    query.reset();

    Data.entities.each(function (key, entity) {
        var primary;
        if (!entity.view_only && entity.id !== "ac_user") {
            primary = entity.primary_key.split(",");
            entity.each(function (field) {
                if (field.type === "Reference" && field.ref_entity === "ac_user") {
                    SQL.Connection.shared.executeUpdate("UPDATE " + entity.table + " A " +
                            "INNER JOIN ac_user B on B._key = A." + field.id + " " +
                            "SET A." + field.id + " = B.id");
                    if (primary.indexOf(field.id) > -1) {
                        SQL.Connection.shared.executeUpdate("UPDATE " + entity.table +
                                " SET _key = concat(" + primary.join(",'.',") + ")");
                    }
                }
            });
        }
    });

    SQL.Connection.shared.executeUpdate("UPDATE ac_user set _key = id");
});


module.exports.getField("status").override("getUneditableCSSStyle", function () {
    var css = "";
    if (this.get() === "R") {            // requested
        css = "color: blue";
    } else if (this.get() === "L") {        // locked
        css = "color: orange";
    } else if (this.get() === "A") {        // active
        css = "color: green";
    } else {
        css = "color: red";            // suspended, rejected
    }
    return css;
});


module.exports.define("create", function (trans, spec) {
    var user_id;
    var user_row;

    if (!spec.user_type || !spec.name || !spec.email) {
        this.throwError({
            id: "missing_properties",
            properties: "user_type, name and/or email",
            user_type: spec.user_type,
            name: spec.name,
            email: spec.email,
        });
    }
    user_id = this.generateId(trans, spec.name, spec.email);
    user_row = trans.createNewRow("ac_user");
    user_row.getField("id").set(user_id);
    user_row.getField("name").set(spec.name);
    user_row.getField("user_type").set(spec.user_type);
    user_row.getField("email").set(spec.email);
    user_row.addRoles();
    spec.session = trans.session;
    if (this.skip_new_user_setup_unlock || spec.skip_new_user_setup_unlock) {
        user_row.getField("status").set("L");         // if not launched, then locked
    } else {
        user_row.setupUnlock(spec, trans);
    }
    return user_row;
});


module.exports.define("getIdFromEmail", function (email) {
    var resultset;
    var out;

    try {
        resultset = SQL.Connection.shared.executeQuery("SELECT _key FROM ac_user WHERE email=" + SQL.Connection.escape(email));
        if (resultset.next()) {
            out = SQL.Connection.getColumnString(resultset, 1);
        }
    } catch (e) {
        this.report(e);
    } finally {
        SQL.Connection.shared.finishedWithResultSet(resultset);
    }
    return out;
});


module.exports.defbind("presaveSendNotification", "presave", function (outcome_id) {
    this.sendEmailAddressChangeNotification();
    this.handleExpiryDateChange();
});


module.exports.define("sendEmailAddressChangeNotification", function () {
    if (this.action !== "C" &&
            this.getField("email").isModified() &&
            this.getField("email").isValid() &&
           !this.email_address_change_ntfcn_sent) {
        Data.entities.get("ac_email").create({
            session: this.trans.session,
            to_user: this.getKey(),
            to_addr: this.getField("email").orig_val,
            new_email_addr: this.getField("email").get(),
            user_name: this.getField("name" ).get(),
            nice_name: Core.Format.convertNameFirstSpaceLast(this.getField("name").get()),
            text_string: "ac.email_address_changed",
        }).send();

        this.email_address_change_ntfcn_sent = true;
    }
});

module.exports.define("generateId", function (trans, name, email) {
    var seed,
        resultset,
        suffix,
        highest = -1;
    var that = this;

    if (this.use_email_address_as_user_id) {
        return email;
    }
    seed = String(name).toLowerCase().replace(/[^a-z]/g, "").substr(0, 8);
    if (seed.length < 7) {
        seed = String(email).toLowerCase().replace(/[^a-z]/g, "").substr(0, 8);
        if (seed.length < 7) {
            this.throwError({ id: "name_or_email_insufficient", name: name, email: email });
        }
    }
    try {
        resultset = SQL.Connection.shared.executeQuery("select id from ac_user where id like '" + seed + "%'");
        while (resultset.next()) {
            suffix = SQL.Connection.getColumnString(resultset, 1).replace(new RegExp("^" + seed), "0");
            highest = Math.max(highest, parseInt(suffix, 10));
            this.trace(this, "generateId() matching prefix found from db, suffix: " + suffix + ", highest now: " + highest);
        }
    } catch (e) {
        this.report(e);
    } finally {
        SQL.Connection.shared.finishedWithResultSet(resultset);
    }
    trans.doFullKeyRows(function (row) {
        if (row.parent.id === "ac_user" && row.getKey().indexOf(seed) === 0) {
            suffix = row.getKey().replace(new RegExp("^" + seed), "0");
            highest = Math.max(highest, parseInt(suffix, 10));
            that.trace(this, "generateId() matching prefix found from trans, suffix: " + suffix + ", highest now: " + highest);
        }
    });
    this.debug("generateId: seed: " + seed + ", suffix: " + suffix + ", highest: " + highest);
    return seed + (highest > -1 ? (highest + 1) : "");
});


module.exports.define("addRoles", function () {
    var user_type_row,
        user_role_row,
        roles,
        i;

    user_type_row = this.getField("user_type").getRow();
    roles = user_type_row.getField("roles").get().split(/\s*,\s*/);
    for (i = 0; i < roles.length; i += 1) {
        user_role_row = this.trans.getRow("ac_user_role", this.getKey() + "." + roles[i]);
        user_role_row.setDelete(false);
    }
});


module.exports.define("clearRoles", function () {
    var trans = this.trans;
    this.eachLinkedRow("ac_user_role", "", function (row, query) {
        if (!row) {
            row = query.getRow(trans);
        }
        row.setDelete(true);
    });
});


module.exports.define("setupUnlock", function (spec, trans) {
    var user_type_row;
    if (this.getField("status").get() !== "A" && this.getField("status").get() !== "L") {      // active or locked
        this.throwError({ id: "account_not_active", text: "User account is not active" });
    }
    user_type_row    = this.getField("user_type").getRow();
    spec.to_user     = this.getKey();
    spec.to_addr     = this.getField("email").get();
// the following should be populated in Data.entities.get("ac_email").create()
//    spec.user_name   = this.getField("name" ).get();
//    spec.nice_name   = x.lib.convertNameFirstSpaceLast(this.getField("name" ).get());
    spec.reset_page  = spec.reset_page  || user_type_row.getField("reset_page" ).get() || "ac_pswd_unlock";
    spec.text_string = spec.text_string || user_type_row.getField("text_string").get() || "ac.user_account_created";
    spec.unlock_code = Core.Format.getRandomString(20);
    spec.unlock_url  = UI.pages.get(spec.reset_page).getSimpleURL() + "&user_id=" + this.getKey() + "&unlock_code=" + spec.unlock_code;
    if (trans && trans.page) {
        trans.page.addEmail(spec);
    } else {
        spec.trans = trans;
        Data.entities.get("ac_email").create(spec).send();
    }
    this.getField("status"     ).set("L");                // locked - requires unlock code
    this.getField("unlock_code").set(spec.unlock_code);
});

module.exports.define("unlock_tokens", [
    "- {unlock_code}  = code to be placed in the URL link to make the unlock mechanism work (you don't normally need to include this directly)",
    "- {unlock_url}   = relative URL to include for the unlock mechanism - prefix this with {base_uri}",
    "- {business_purpose}   = Short Business Purpose"
]);


module.exports.define("unlock", function (unlock_code, new_password) {
    if (this.checkUnlockCode(unlock_code)) {
        this.throwError({ id: "invalid_unlock_code", text: "Your unlock code is invalid" });
    }
    this.getField("status"     ).set("A");           // activate account
    this.getField("unlock_code").set("");
    this.getField("email_verification").set("V");
    this.happen("unlockAccount");
    this.setNewPassword(new_password);
});


module.exports.define("checkUnlockCode", function (new_unlock_code) {
    var unlock_code = this.getField("unlock_code").get();
    return (unlock_code !== new_unlock_code);
});


module.exports.define("setNewPassword", function (new_password) {
    var salt       = Packages.rsl.Lib.generateSalt(),
        iterations = Rhino.app.iterations;

    this.trace(this, "setNewPassword() iterations: " + iterations + ", salt: " + salt);
    this.getField("password"     ).set("");
    this.getField("pswd_last_upd").set("today");
    this.getField("salt"         ).set(String(salt));
    this.getField("iterations"   ).set(iterations);
    // new_password = new_password.replace(/&pound;/g, "£").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    this.getField("pswd_pbkdf"   ).set(String(Packages.rsl.Lib.encryptPBKDF(IO.JSoup.unescape(new_password), salt, iterations)));
});


module.exports.define("suspend", function () {
    this.getField("status").set("S");              // suspended - requires manual unlock
});


module.exports.define("doesEmailAlreadyExist", function (email, ignore_user_id) {
    var sql = "SELECT 1 FROM ac_user WHERE email = " + SQL.Connection.escape(email),
        resultset;

    if (ignore_user_id) {
        sql += " AND id <> " + SQL.Connection.escape(ignore_user_id);
    }
    try {
        resultset = SQL.Connection.shared.executeQuery(sql);
        if (resultset.next()) {
            return true;
        }
    } catch (e) {
        this.report(e);
    } finally {
        SQL.Connection.shared.finishedWithResultSet(resultset);
    }
    return false;
});


module.exports.define("handleExpiryDateChange", function () {
    if (this.getField("status").get() === "A" &&
            this.getField("email_verification").get() === "V" &&
           !this.getField("expiry_date").isBlank() &&
            this.getField("expiry_date").isAfter(this.getField("expiry_date").orig_val)) {
        this.notifyAccountExtension();
    }
});

module.exports.define("notifyAccountExtension", function () {
    var spec = {
        text_string: "ac.user_account_extended",
        to_user: this.getKey(),
        to_addr: this.getField("email").get(),
        business_purpose: Rhino.app.client.business_purpose,
    };

    this.trans.addEmail(spec);
});
