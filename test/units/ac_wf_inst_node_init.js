/*global x, java */
"use strict";

/* What behaviour are we testing?
 * 1. should call the entity init function, with self as a parameter
 * 2. should clone the parent's transitions if it is not an instance
 * 3. should set the transistion's wf_tmpl_node property to the node
 */

x.test.TestCoverage.ac_wf_inst_node_init = function () {
    var wf_inst_node,
        backupEntityInit,
        calledWith;
    function beforeEach() {
        wf_inst_node = Data.entities.get("ac_wf_inst_node").clone({id: "test_wf_inst_node"});
        wf_inst_node.modifiable = true;
        calledWith = {};
    }
    function isEquivalent(a, b) {

        var aProps, bProps;

        if (a === b) {
            return true;
        }

        if (Array.isArray(a)) {
            if (!Array.isArray(b) || a.length !== b.length) {
                return false;
            }
            return a.every(function (item, index) {
                return isEquivalent(item, b[index]);
            });
        }

        if (typeof a === "object") {
            aProps = Object.getOwnPropertyNames(a);
            bProps = Object.getOwnPropertyNames(b);

            if (aProps.length !== bProps.length) {

                return false;
            }

            return aProps.every(function (key) {
                var aVal = a[key],
                    bVal = b[key];

                return isEquivalent(aVal, bVal);
            });
        }
        return false;
    }
    function isClone(a, b) {
        //like isEquivalent, but ignores id, parent and wf_tmpl_node field
        //...This started with good intentions, but the wf_tmpl_node bit kind of broke the neatness
        //TODO refactor to give parameter of excluded fields
        var aProps, bProps;

        if (a === b) {
            return true;
        }

        if (Array.isArray(a)) {
            if (!Array.isArray(b) || a.length !== b.length) {
                return false;
            }
            return a.every(function (item, index) {
                return isEquivalent(item, b[index]);
            });
        }

        if (typeof a === "object") {
            aProps = Object.getOwnPropertyNames(a);
            bProps = Object.getOwnPropertyNames(b);

            if (aProps.length !== bProps.length) {

                return false;
            }

            return aProps.every(function (key) {
                var aVal = a[key],
                    bVal = b[key];
                if (key !== "id" && key !== "parent" && key !== "wf_tmpl_node"){
                    return isEquivalent(aVal, bVal);
                }
                return true;
            });
        }
        return false;
    }
    backupEntityInit = x.Entity.init.call;
    x.Entity.init.call = function (param) {
        calledWith = param;
    };

    //Test 1.
    beforeEach();
    wf_inst_node.init();
    this.assert(isEquivalent(calledWith, wf_inst_node), "should call the entity init function, with self as a parameter");

    //Test 2.
    beforeEach();
    wf_inst_node.instance = true;
    wf_inst_node.init();
    this.assert(isClone(wf_inst_node.transitions, wf_inst_node.parent.transitions), "should clone the parent's transitions if it is not an instance");

    //Test 3.
    beforeEach();
    wf_inst_node.instance = true;
    wf_inst_node.init();
    this.assert(isEquivalent(wf_inst_node.transitions.wf_tmpl_node, wf_inst_node), "should set the transistion's wf_tmpl_node property to the node");

    x.Entity.init.call = backupEntityInit;
};