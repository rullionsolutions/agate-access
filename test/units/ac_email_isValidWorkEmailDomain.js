"use strict";

x.test.TestCoverage.define("ac_email_isValidWorkEmailDomain", function () {
    var random_email = "email@random_domain";
    var valid_email = "email@valid_domain";
    this.assert(Data.entities.get("ac_email").isValidWorkEmailDomain(random_email) === true,
        "random_email is valid when x.areas.ac.params.valid_work_email_domains is empty");

    x.areas.ac.params.valid_work_email_domains.push("valid_domain");
    this.assert(Data.entities.get("ac_email").isValidWorkEmailDomain(random_email) === false,
        "random_email is invalid as x.areas.ac.params.valid_work_email_domains only contains valid_domain");

    this.assert(Data.entities.get("ac_email").isValidWorkEmailDomain(valid_email) === true,
        "valid_email is valid as x.areas.ac.params.valid_work_email_domains contains valid_domain");

    x.areas.ac.params.valid_work_email_domains.push("random_domain");
    this.assert(Data.entities.get("ac_email").isValidWorkEmailDomain(random_email) === true,
        "random_email is valid as x.areas.ac.params.valid_work_email_domains also contains random_domain");

    x.areas.ac.params.valid_work_email_domains = [];
});
