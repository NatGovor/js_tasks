/*It's tmp version, I don't want to use object myLib*/
var myLib = {};

(function () {
    "use strict"

    myLib.partial = function (argsF) {
        var slice = Array.prototype.slice,
            argsF = slice.call(arguments, 0, arguments.length - 1),
            func = arguments[arguments.length - 1];

        if (typeof func !== "function") {
            throw new TypeError(func + " is not a function");
        }

        return function () {
            return func.apply(this, slice.call(arguments).concat(argsF));
        }        
    }

    myLib.curry = function (func) {
        if (typeof func !== "function") {
            throw new TypeError(func + " is not a function");
        }

        var needArgsCount = func.length;

        return function f(arg) {
            func.hasArgsCount = func.hasArgsCount || 0;
            func.args = func.args || [];
            func.hasArgsCount++;
            func.args.push(arg);

            if (func.hasArgsCount == needArgsCount) {
                return func.apply(this, func.args);
            }
            else {
                return myLib.curry(func, arg);
            }
        }

    };

    myLib.fold = function(array, callback, initialValue) {
        if (!(array instanceof Array)) {
            throw new TypeError(array + " is not an Array");
        }

        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        var value = 0;

        if (typeof initialValue !== "undefined") {
            value = initialValue;
        }

        for (var i = 0, length = array.length; i < length; i++) {
            value = callback(value, array[i], i, array);
        }

        return value;
    }

    myLib.unfold = function(number, callback) {
        if (typeof number !== "number") {
            throw new TypeError(number + " is not a number");
        }

        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        var value = number.valueOf(),
            sequence = [],
            result;

        while (result = callback(value)) {
            sequence.push(result[0]);
            value = result[1];
        }

        return sequence;
    }

    myLib.map = function(array, callback) {
        if (!(array instanceof Array)) {
            throw new TypeError(array + " is not an Array");
        }

        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        var resultArray = [];

        for (var i = 0, length = array.length; i < length; i++) {
            resultArray.push(callback(array[i]));
        }

        return resultArray;
    }

    myLib.filter = function(array, callback) {
        if (!(array instanceof Array)) {
            throw new TypeError(array + " is not an Array");
        }

        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        var resultArray = [];

        for (var i = 0, length = array.length; i < length; i++) {
            if (callback(array[i])) {
                resultArray.push(array[i]);
            }
        }

        return resultArray;
    }

    myLib.firstElement = function(array, condition) {
        if (!(array instanceof Array)) {
            throw new TypeError(array + " is not an array");
        }

        if (typeof condition !== "function") {
            throw new TypeError(condition + " is not a function");
        }

        for (var i = 0, length = array.length; i < length; i++) {
            if (condition(array[i])) {
                return array[i];
            }
        }

        return undefined;
    }

    myLib.makeLazy = function(func) {
        if (typeof func !== "function") {
            throw new TypeError(func + " is not a function");
        }

        var args = Array.prototype.slice.call(arguments, 1, arguments.length);

        return function () {
            return func.apply(this, args);
        }
    }

    myLib.memoize = function(func) {
        if (typeof func !== "function") {
            throw new TypeError(func + " is not a function");
        }

        function getObjectHash(obj) {
            var result = arguments[1] || "";
            for (var i in obj) {
                if (typeof obj[i] === "object") {
                    result += getObjectHash(obj[i], result);
                }
                else {
                    result += obj[i];
                }
            }
            return result;
        }

        function getHash(args) {
            var hash = "";
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === "object") {
                    hash = getObjectHash(args[i]);
                }
                else {
                    hash += args[i];
                }
            }
            return hash;
        }

        var cache = {};

        return function () {

            var hash = getHash(arguments); 

            if (hash in cache) {
                console.log("from cache");
                return cache[hash];
            }
            else {
                return cache[hash] = func.apply(this, arguments);
            }
        }
    }

})();




