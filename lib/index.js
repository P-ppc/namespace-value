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