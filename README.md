[![Build Status](https://travis-ci.org/P-ppc/namespace-value.svg?branch=master)](ttps://travis-ci.org/P-ppc/namespace-value)
### USAGE
first download from github

for browser you have to import like this:
```html
<script src="namespace-value/dist/namespace-value.js"></script>
```
basis use in node and browser
``` js
var namespaceValue = require("namespace-value");

var user = {name: "ppc"};
var username = namespaceValue(user, "name", "default");  // => "ppc"
var notFoundValue = namespaceValue(user, "age"); // => not found, so it return undefined
var defaultValue = namespaceValue(user, "sex", "male"); // => not found, so it return default value "male".
```
also support array
```js
var array = [
    { name: "ppc" }
];
var name = namespaceValue(array, "0.name", "default"); // => "ppc"
```

set global
```js
namespaceValue.setGlobal("$value"); // it will set a function to Object.prototype
var username = user.$value("name", "default"); // => same as "ppc"
namespaceValue.clearGlobal("$value"); // clear the function of Object.prototype
```
