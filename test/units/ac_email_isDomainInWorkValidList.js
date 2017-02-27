"use strict";

x.test.TestCoverage.define("ac_email_isDomainInWorkValidList", function () {
    this.assert(Data.entities.get("ac_email").isDomainInWorkValidList("random_domain") === true,
        "random_domain is valid when x.areas.ac.params.valid_work_email_domains is empty");

    x.areas.ac.params.valid_work_email_domains.push("valid_domain");
    this.assert(Data.entities.get("ac_email").isDomainInWorkValidList("random_domain") === false,
        "random_domain is invalid as x.areas.ac.params.valid_work_email_domains only contains valid_domain");

    this.assert(Data.entities.get("ac_email").isDomainInWorkValidList("valid_domain") === true,
        "valid_domain is valid as x.areas.ac.params.valid_work_email_domains contains valid_domain");

    x.areas.ac.params.valid_work_email_domains.push("random_domain");
    this.assert(Data.entities.get("ac_email").isDomainInWorkValidList("random_domain") === true,
        "random_domain is valid as x.areas.ac.params.valid_work_email_domains also contains random_domain");

    x.areas.ac.params.valid_work_email_domains = [];
});
