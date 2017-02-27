/*global x, java */
"use strict";

/* What are we testing?
 * 1. should throw error if page does not exist.
 * 2. should set the node's 'page' field to the given page_id.
 * 3. should set the node's 'title' field to the title of the page.
 * 4. if the page entity is the ac_wf_inst_node prototype, should set the node's 'page_key' field to it's own key.
 * 5. should set the node's 'page_key' field to the key_string from the node, if the page entity is not the node prototype.
 */

x.test.TestCoverage.ac_wf_inst_node_setupNodeFromPage = function () {
    var node,
        wf_inst,
        page,
        success;
    function beforeEach() {
        node = Data.entities.get("ac_wf_inst_node").clone({id: "test_node"});
        node.modifiable = true;
        wf_inst = Data.entities.get("ac_wf_inst").clone({id: "test_wf_inst"});
        wf_inst.modifiable = true;
        wf_inst.getField("key_string").set("test_key_string");
        node.wf_inst = wf_inst;
        page = x.Page.clone({id: "test_page"});
        page.title = "test_page_title";
        UI.pages.get(test_page) = page;
        success = false;
    }

    //Test 1.
    beforeEach();
    delete UI.pages.get(test_page);
    try {
        node.setupNodeFromPage("test_page");
    }
    catch(err) {
        if (err.id === "page_not_found") {
            success = true;
        }
    }
    this.assert(success === true, "should throw error if page does not exist.");

    //Test 2.
    beforeEach();
    node.setupNodeFromPage("test_page");
    this.assert(node.getField("page").get() === "test_page", "should set the node's 'page' field to the given page_id.");

    //Test 3.
    beforeEach();
    node.setupNodeFromPage("test_page");
    this.assert(node.getField("title").get() === "test_page_title", "should set the node's 'title' field to the title of the page.");

    //Test 4.
    //TODO - this is a weird one, I'm not sure what it means, and the only test I can think of for it feels quite dirty

    //Test 5.
    beforeEach();
    node.setupNodeFromPage("test_page");
    this.assert(node.getField("page_key").get() === "test_key_string", "should set the node's 'page_key' field to the key_string from the node, if the page entity is not the node prototype.");
};