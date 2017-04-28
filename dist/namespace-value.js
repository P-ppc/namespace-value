require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"namespace-value":[function(require,module,exports){
"use strict";

let namespaceValue = function (obj, path, defaultValue) {
    let value = defaultValue,
        splitter = ".",
        fields = path.split(splitter);
    
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (obj[field] === undefined) {
            break;
        } else {
            obj = obj[field];
            if (i == fields.length - 1) {
                value = obj;
            }
        }
    }
    
    return value;
};

namespaceValue.setGlobal = function (functionName) {
    Object.prototype[functionName] = function (path, defaultValue) {
        return namespaceValue.call(null, this, path, defaultValue);
    };
};

namespaceValue.clearGlobal = function (functionName) {
    return delete Object.prototype[functionName];
};

module.exports = namespaceValue;
},{}]},{},[]);
