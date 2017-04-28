"use strict";

const assert = require("assert");
const namespaceValue = require("../lib");

describe("namespaceValue", function () {
    let data;
    
    beforeEach(function () {
        data = {
            users: [
                {name: "jack", sex: "male", age: 20, address: "Hollywood"},
                {name: "ppc", sex: "male", age: 23, address: undefined}
            ],
            company: {
                name: "Google",
                departments: [
                    {name: "develop", code: 1},
                    {name: "market"}
                ]
            }
        }
    });

    afterEach(function () {
        data = null;
    });

    it("should return the value if path exists", function () {
        let company = namespaceValue(data, "company");
        assert.strictEqual(company, data.company);
        let developName = namespaceValue(data, "company.departments.0.name");
        assert.strictEqual(developName, "develop");
    });

    it("should return undefined if path not exists", function () {
        let job = namespaceValue(data, "job");
        assert.strictEqual(job, undefined);
        job = namespaceValue(data, "company.job");
        assert.strictEqual(job, undefined);
    });

    it("should return default value if path not exists and have defaultValue", function () {
        let code = namespaceValue(data, "company.departments.1.code");
        assert.strictEqual(code, undefined);
        code = namespaceValue(data, "company.departments.1.code", 2);
        assert.strictEqual(code, 2);
    });

    it("should have $value function as namespaceVlue bind for object if use setGlobal('$value')", function () {
        namespaceValue.setGlobal("$value");
        var obj = {};
        assert.strictEqual(typeof obj.$value, "function");
        var company = data.$value("company");
        assert.strictEqual(company, data.company);
    });

    it("should remove function of object if use clearGlobal", function () {
        namespaceValue.setGlobal("$value");
        namespaceValue.clearGlobal("$value");
        var obj = {};
        assert.strictEqual(typeof obj.$value, "undefined");
    });
});