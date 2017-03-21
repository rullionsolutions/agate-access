"use strict";

var IO = require("lazuli-io/index.js");
var Rhino = require("lazuli-rhino/index.js");
var Access = require("lazuli-access/index.js");


IO.HttpServer.define("logoutUserAllSessions", function (request, response) {
    var params = IO.HttpServer.collectHttpParametersFromJava(request);
    var sessions_closed;

    IO.HttpServer.info("logoutUserAllSessions() " + params.user_id + " ---");
    try {
        IO.HttpServer.checkInternalRullionRequest(request);
        sessions_closed = Access.Session.closeAll(null, params.user_id);
        response.getWriter().println(sessions_closed);
    } catch (e) {
        response.setStatus(response.SC_FORBIDDEN, "Access denied");
    }
});


// assumes requests from outside Rullion come in via Apache httpd and then to Tomcat via AJP on port 8009
IO.HttpServer.define("checkInternalRullionRequest", function (request) {
    var port = request.getServerPort();
    if (port !== Rhino.app.other_app_server_comm_port) {
        IO.HttpServer.throwError("invalid request - might have come from outside Rullion");
    }
});


Access.Session.defbind("closeAllSessionsOnAllServers", "start", function () {
    var open_sessions = this.closeAll(this.id, this.user_id);
    var other_app_servers = Rhino.app.other_app_servers;
    var i;

    this.debug("closed " + open_sessions + " other sessions on same server");
    for (i = 0; other_app_servers && i < other_app_servers.length; i += 1) {
        open_sessions += this.closeAllSessionsOnOtherServer(other_app_servers[i]);
    }
    if (open_sessions > 0) {
        this.getMessageManager().add({
            type: 'W',
            text: "You had other open sessions which have been now been closed",
        });
    }
});


Access.Session.define("closeAllSessionsOnOtherServer", function (hostname) {
    var http = IO.HttpClient.clone({
        id: "logoutUserAllSessions",
        protocol: "http",
        domain: hostname,
        port: Rhino.app.other_app_server_comm_port || 8082,
        path: Rhino.app.app_id + "/dyn/",
        query_string: "mode=logoutUserAllSessions&user_id=" + this.user_id
    });

    http.exec();
    return parseInt(http.response.body, 10);
});
