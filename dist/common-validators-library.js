(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.commonValidatorsLibrary = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var toDateTime = require('normalize-date');

/* Validators */
var validators = {
    custom: function custom(value, arg, options) {
        if (typeof arg === 'function') {
            return arg(value, options);
        }
    },

    //Isn't empty
    required: function required(value) {
        if (!exists(value)) {
            return "Is required";
        }
    },
    presence: 'required',

    notEmpty: function notEmpty(value) {
        if (isEmpty(value)) {
            return "Can't be blank";
        }
    },

    //Equality
    equal: function equal(value, arg, options) {
        if (exists(value) && !deepEqual(value, arg, options.strict)) {
            return 'Must be equal %{arg}';
        }
    },

    confirm: function confirm(value, options) {
        if (exists(value) && !deepEqual(toObject(value)[options.key], toObject(value)[options.comparedKey], options.strict)) {
            return '%{key} must be equal %{comparedKey}';
        }
    },

    //Types
    object: function object(value) {
        if (!isPlainObject(value)) {
            return 'Must be an object';
        }
    },

    array: function array(value) {
        if (!isArray(value)) {
            return 'Must be an array';
        }
    },

    string: function string(value) {
        if (!isString(value)) {
            return 'Must be a string';
        }
    },

    number: function number(value) {
        if (!isNumber(value)) {
            return 'Must be a number';
        }
    },

    integer: function integer(value) {
        if (!isInteger(value)) {
            return 'Must be an integer';
        }
    },

    date: function date(value) {
        if (!isDateTime(value)) {
            return 'Must be a valid date';
        }
    },

    boolean: function boolean(value) {
        if (!isBoolean(value)) {
            return 'Must be a boolean';
        }
    },

    function: function _function(value) {
        if (!isFunction(value)) {
            return 'Must be a function';
        }
    },

    null: function _null(value) {
        if (value !== null) {
            return 'Must be a null';
        }
    },

    //Number
    max: function max(value, arg, options) {
        if (exists(value) && !(options.exclusive ? toNumber(value) < arg : toNumber(value) <= arg)) {
            return options.exclusive ? 'Must be less %{arg}' : 'Must be less or equal %{arg}';
        }
    },

    min: function min(value, arg, options) {
        if (exists(value) && !(options.exclusive ? toNumber(value) > arg : toNumber(value) >= arg)) {
            return options.exclusive ? 'Must be more %{arg}' : 'Must be more or equal %{arg}';
        }
    },

    range: function range(value, options) {
        if (exists(value)) {
            if (!(options.exclusiveFrom || options.exclusive ? toNumber(value) > options.from : toNumber(value) >= options.from)) {
                return {
                    error: 'range.less',
                    message: options.lessMessage || 'Must be from %{from} to %{to}'
                };
            } else if (!(options.exclusiveTo || options.exclusive ? toNumber(value) < options.to : toNumber(value) <= options.to)) {
                return {
                    error: 'range.many',
                    message: options.manyMessage || 'Must be from %{from} to %{to}'
                };
            }
        }
    },

    odd: function odd(value) {
        if (exists(value) && toNumber(value) % 2 !== 1) {
            return 'Must be odd';
        }
    },

    even: function even(value) {
        if (exists(value) && toNumber(value) % 2 !== 0) {
            return 'Must be even';
        }
    },

    divisible: function divisible(value, arg) {
        if (exists(value) && toNumber(value) % arg !== 0) {
            return 'Must be divisible by %{arg}';
        }
    },

    maxLength: function maxLength(value, arg) {
        if (exists(value) && toArray(value).length > arg) {
            return 'Length must be less or equal %{arg}';
        }
    },

    minLength: function minLength(value, arg) {
        if (exists(value) && toArray(value).length < arg) {
            return 'Length must be more or equal %{arg}';
        }
    },

    equalLength: function equalLength(value, arg) {
        if (exists(value) && toArray(value).length !== arg) {
            return 'Length must be equal %{arg}';
        }
    },

    rangeLength: function rangeLength(value, options) {
        if (exists(value)) {
            if (toArray(value).length > options.to) {
                return {
                    error: 'rangeLength.many',
                    message: options.manyMessage || 'Length must be from %{from} to %{to}'
                };
            } else if (toArray(value).length < options.from) {
                return {
                    error: 'rangeLength.less',
                    message: options.lessMessage || 'Length must be from %{from} to %{to}'
                };
            }
        }
    },

    //Size
    maxSize: function maxSize(value, arg) {
        var valueSize = byteLength(value);

        if (exists(value) && valueSize > arg) {
            return {
                message: 'Size must be less %{arg}',
                size: valueSize
            };
        }
    },

    minSize: function minSize(value, arg) {
        var valueSize = byteLength(value);

        if (exists(value) && valueSize < arg) {
            return {
                message: 'Size must be more %{arg}',
                size: valueSize
            };
        }
    },

    equalSize: function equalSize(value, arg) {
        var valueSize = byteLength(value);

        if (exists(value) && valueSize !== arg) {
            return {
                message: 'Length must be equal %{arg}',
                size: valueSize
            };
        }
    },

    rangeSize: function rangeSize(value, options) {
        var valueSize = byteLength(value);

        if (exists(value)) {
            if (valueSize < options.from) {
                return {
                    error: 'rangeSize.less',
                    message: options.lessMessage || 'Size must be from %{from} to %{to}',
                    size: valueSize
                };
            } else if (valueSize > options.to) {
                return {
                    error: 'rangeSize.many',
                    message: options.manyMessage || 'Size must be from %{from} to %{to}',
                    size: valueSize
                };
            }
        }
    },

    //RegExp
    pattern: function pattern(value, arg) {
        if (exists(value) && !new RegExp(arg).test(toString(value))) {
            return 'Does not match the pattern %{arg}';
        }
    },

    //White and black list
    inclusion: function inclusion(value, arg) {
        if (exists(value) && !contains(arg, value)) {
            return '%{value} is not allowed';
        }
    },

    exclusion: function exclusion(value, arg) {
        if (exists(value) && contains(arg, value, true)) {
            return '%{value} is restricted';
        }
    },

    //Date and time
    maxDateTime: function maxDateTime(value, arg, options) {
        if (exists(value) && !(options.exclusive ? toDateTime(value) < toDateTime(arg) : toDateTime(value) <= toDateTime(arg))) {
            return 'Must be earlier than %{arg}';
        }
    },

    maxDate: function maxDate(value, arg, options) {
        if (exists(value) && !(options.exclusive ? toDate(value) < toDate(arg) : toDate(value) <= toDate(arg))) {
            return 'Must be earlier than %{arg}';
        }
    },

    minDateTime: function minDateTime(value, arg, options) {
        if (exists(value) && !(options.exclusive ? toDateTime(value) > toDateTime(arg) : toDateTime(value) >= toDateTime(arg))) {
            return 'Must be no earlier than %{arg}';
        }
    },

    minDate: function minDate(value, arg, options) {
        if (exists(value) && !(options.exclusive ? toDate(value) > toDate(arg) : toDate(value) >= toDate(arg))) {
            return 'Must be no earlier than %{arg}';
        }
    },

    equalDateTime: function equalDateTime(value, arg) {
        if (exists(value) && toDateTime(value).valueOf() !== toDateTime(arg).valueOf()) {
            return 'Must be equal %{arg}';
        }
    },

    equalDate: function equalDate(value, arg) {
        if (exists(value) && toDate(value).valueOf() !== toDate(arg).valueOf()) {
            return 'Must be equal %{arg}';
        }
    },

    rangeDateTime: function rangeDateTime(value, options) {
        if (exists(value)) {
            if (!(options.exclusiveFrom || options.exclusive ? toDateTime(value) > toDateTime(options.from) : toDateTime(value) >= toDateTime(options.from))) {
                return {
                    error: 'rangeDateTime.many',
                    message: options.manyMessage || 'Must be from %{from} to %{to}'
                };
            } else if (!(options.exclusiveTo || options.exclusive ? toDateTime(value) < toDateTime(options.to) : toDateTime(value) <= toDateTime(options.to))) {
                return {
                    error: 'rangeDateTime.less',
                    message: options.lessMessage || 'Must be from %{from} to %{to}'
                };
            }
        }
    },

    rangeDate: function rangeDate(value, options) {
        if (exists(value)) {
            if (!(options.exclusiveFrom || options.exclusive ? toDate(value) > toDate(options.from) : toDate(value) >= toDate(options.from))) {
                return {
                    error: 'rangeDate.many',
                    message: options.manyMessage || 'Must be from %{from} to %{to}'
                };
            } else if (!(options.exclusiveTo || options.exclusive ? toDate(value) < toDate(options.to) : toDate(value) <= toDate(options.to))) {
                return {
                    error: 'rangeDate.less',
                    message: options.lessMessage || 'Must be from %{from} to %{to}'
                };
            }
        }
    },

    //Web
    email: function email(value) {
        var PATTERN = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

        if (exists(value) && !PATTERN.exec(toString(value))) {
            return 'Must be a valid email';
        }
    },

    // A URL validator that is used to validate URLs with the ability to
    // restrict schemes and some domains.
    url: function url(value, options) {
        if (exists(value)) {
            var protocols = options.protocols || ['http', 'https'];

            // https://gist.github.com/dperini/729294
            var regex = '^' +
            // schemes
            '(?:(?:' + protocols.join('|') + '):\\/\\/)' +
            // credentials
            '(?:\\S+(?::\\S*)?@)?';

            regex += '(?:';

            var tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))';

            // This ia a special case for the localhost hostname
            if (options.allowLocal) {
                tld += '?';
            } else {
                // private & local addresses
                regex += '(?!10(?:\\.\\d{1,3}){3})' + '(?!127(?:\\.\\d{1,3}){3})' + '(?!169\\.254(?:\\.\\d{1,3}){2})' + '(?!192\\.168(?:\\.\\d{1,3}){2})' + '(?!172' + '\\.(?:1[6-9]|2\\d|3[0-1])' + '(?:\\.\\d{1,3})' + '{2})';
            }

            var hostname = '(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)' + '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*' + tld + ')';

            // reserved addresses
            regex += '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' + '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' + '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' + '|' + hostname +
            // port number
            '(?::\\d{2,5})?' +
            // path
            '(?:\\/[^\\s]*)?' + '$';

            var PATTERN = new RegExp(regex, 'i');

            if (!PATTERN.exec(toString(value))) {
                return 'is not a valid url';
            }
        }
    },

    ipAddress: function ipAddress(value, options) {
        if (exists(value)) {
            var IPV4_REGEXP = /^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$/;
            var IPV6_REGEXP = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
            var HOSTNAME_REGEXP = /^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$/;

            var regExps = { ipv4: IPV4_REGEXP, ipv6: IPV6_REGEXP, hostname: HOSTNAME_REGEXP };

            var isError = !Object.keys(regExps).some(function (key) {
                if (options[key] || options[key] === undefined) {
                    return regExps[key].test(toString(value));
                }
            });

            var ipv4 = options.ipv4;
            var ipv6 = options.ipv6;
            var hostname = options.hostname;

            if (isError) {
                if (ipv4 && !ipv6 && !hostname) {
                    return {
                        error: 'ip.v4',
                        message: options.ipv4Message || 'Must be a valid IPv4 address'
                    };
                }

                if (ipv6 && !ipv4 && !hostname) {
                    return {
                        error: 'ip.v6',
                        message: options.ipv6Message || 'Must be a valid IPv6 address'
                    };
                }

                if (hostname && !ipv4 && !ipv6) {
                    return {
                        error: 'ip.hostname',
                        message: options.hostnameMessage || 'Must be a valid hostname'
                    };
                }

                if (ipv6 && ipv4 && !hostname) {
                    return {
                        error: 'ip.address',
                        message: options.addressMessage || 'Must be a valid IP address'
                    };
                }

                return 'Must be a valid IP address or hostname';
            }
        }
    },

    //File
    accept: function accept(files, arg, options) {
        files = toArray(options.files || files);

        if (exists(files)) {
            var _ret = function () {
                var allowedTypes = (arg || '').split(',').map(function (type) {
                    return type.trim().replace('*', '');
                });

                var isError = files.some(function (file) {
                    return allowedTypes.every(function (type) {
                        if (type[0] === '.') {
                            //extension
                            return '.' + ((file.name || '').split('.').pop() || '').toLowerCase() !== type;
                        } else {
                            //mime type
                            return (file.type || '').indexOf(type) === -1;
                        }
                    });
                });

                if (isError) {
                    return {
                        v: 'File must be a %{arg}'
                    };
                }
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
    },
    minFileSize: function minFileSize(files, arg, options) {
        files = toArray(options.files || files);

        if (exists(files) && !files.every(function (file) {
            return toNumber(file.size) >= arg;
        })) {
            return 'File size must be more or equal %{arg} bytes';
        }
    },
    maxFileSize: function maxFileSize(files, arg, options) {
        files = toArray(options.files || files);

        if (exists(files) && !files.every(function (file) {
            return toNumber(file.size) <= arg;
        })) {
            return 'File size must be less or equal %{arg} bytes';
        }
    },
    minFileSizeAll: function minFileSizeAll(files, arg, options) {
        files = toArray(options.files || files);

        if (exists(files) && !(files.reduce(function (prev, curr) {
            return toNumber(prev.size || prev) + toNumber(curr.size);
        }) >= arg)) {
            return 'Total files size must be more or equal %{arg} bytes';
        }
    },
    maxFileSizeAll: function maxFileSizeAll(files, arg, options) {
        files = toArray(options.files || files);

        if (exists(files) && !(files.reduce(function (prev, curr) {
            return toNumber(prev.size || prev) + toNumber(curr.size);
        }) <= arg)) {
            return 'Total files size must be less or equal %{arg} bytes';
        }
    },
    minFileNameLength: function minFileNameLength(files, arg, options) {
        files = toArray(options.files || files);

        if (exists(files) && files.some(function (file) {
            return toArray(file.name).length < arg;
        })) {
            return 'File name length must be more or equal %{arg}';
        }
    },
    maxFileNameLength: function maxFileNameLength(files, arg, options) {
        files = toArray(options.files || files);

        if (exists(files) && files.some(function (file) {
            return toArray(file.name).length > arg;
        })) {
            return 'File name length must be less or equal %{arg}';
        }
    },


    //Test
    alwaysValid: function alwaysValid() {},
    alwaysInvalid: function alwaysInvalid() {
        return 'Any value is invalid';
    }
};

/* Utils */
var util = {
    toDateTime: toDateTime,
    toDate: toDate,
    isNumber: isNumber,
    isFunction: isFunction,
    isInteger: isInteger,
    isBoolean: isBoolean,
    isArray: isArray,
    isDateTime: isDateTime,
    isString: isString,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isDefined: isDefined,
    isEmpty: isEmpty,
    exists: exists,
    contains: contains,
    toArray: toArray,
    toNumber: toNumber,
    toString: toString,
    toObject: toObject,
    byteLength: byteLength
};

function toDate(date) {
    return toDateTime(date, { noTime: true });
}

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

function isFunction(value) {
    return typeof value === 'function';
}

function isInteger(value) {
    return isNumber(value) && value % 1 === 0;
}

function isBoolean(value) {
    return typeof value === 'boolean';
}

function isArray(value) {
    return Array.isArray(value);
}

function isDateTime(value) {
    return !isArray(value) && !isNaN(Date.parse(value));
}

function isString(value) {
    return typeof value === 'string';
}

function isObject(obj) {
    return obj === Object(obj);
}

//This is no full plain-object checking, but it is better for validation when you need to know
//that object is no array or hasn't common type. Generally you prefer to consider instance of custom class as object
function isPlainObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && value !== null && !isArray(value) && !(value instanceof RegExp) && !(value instanceof Date) && !(value instanceof Error) && !(value instanceof Number) && !(value instanceof String) && !(value instanceof Boolean) && (typeof value.toDateTime !== 'function' || value.propertyIsEnumerable('toDateTime')); //Moment.js date
}

// Returns false if the object is `null` of `undefined`
function isDefined(obj) {
    return obj != null;
}

//Note! undefined is not empty
function isEmpty(value) {
    if (value === null || typeof value === 'number' && isNaN(value)) {
        return true;
    }

    if (isString(value)) {
        return (/^\s*$/.test(value)
        ); //Whitespace only strings are empty
    }

    if (isArray(value)) {
        return value.length === 0;
    }

    if (isPlainObject(value)) {
        //If we find at least one property we consider it non empty
        for (var attr in value) {
            return false;
        }
        return true;
    }

    return value instanceof Date && isNaN(Date.parse(value)); //Invalid date is empty

    //Boolean, Date, RegExp, Error, Number, Function etc. are not empty
}

function exists(value) {
    return value !== undefined && !isEmpty(value);
}

function contains(collection, value, some) {
    some = some ? 'some' : 'every';

    if (!isDefined(collection)) {
        return false;
    }

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        return toArray(value)[some](function (val) {
            return contains(collection, val);
        });
    }

    return toArray(collection).indexOf(value) !== -1;
}

function deepEqual(actual, expected, strict) {
    if (strict !== false) {
        strict = true;
    }

    if (actual === expected) {
        return true;
    } else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();
    } else if (!actual || !expected || (typeof actual === 'undefined' ? 'undefined' : _typeof(actual)) != 'object' && (typeof expected === 'undefined' ? 'undefined' : _typeof(expected)) != 'object') {
        return strict ? actual === expected : actual == expected;
    } else {
        return objEqual(actual, expected, strict);
    }
}

function objEqual(a, b, strict) {
    var i, key;

    if (!isDefined(a) || !isDefined(b)) {
        return false;
    }

    if (a.prototype !== b.prototype) return false;

    try {
        var ka = Object.keys(a),
            kb = Object.keys(b);
    } catch (e) {
        //happens when one is a string literal and the other isn't
        return false;
    }

    if (ka.length !== kb.length) return false;

    ka.sort();
    kb.sort();

    //cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i]) return false;
    }

    //possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!deepEqual(a[key], b[key], strict)) return false;
    }

    return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b));
}

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

function toArray(value) {
    if (!value) {
        return [];
    }

    if (isArray(value)) {
        return value;
    }

    if (isString(value)) {
        return reHasUnicode.test(value) ? string.match(reUnicode) || [] : value.split('');
    }

    if (Array.from && (value.length || value instanceof Map || value instanceof Set || value[Symbol && Symbol.iterator])) {
        return Array.from(value);
    }

    return Object.keys(value);
}

function toNumber(value) {
    return Number(value);
}

function toString(value) {
    return value && !isObject(value) ? String(value) : '';
}

function toObject(value) {
    return isObject(value) ? value : {};
}

function byteLength(str) {
    str = str ? typeof str === 'string' ? str : JSON.stringify(str) : '';
    // returns the byte length of an utf8 string
    var s = str.length;
    for (var i = str.length - 1; i >= 0; i--) {
        var code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;else if (code > 0x7ff && code <= 0xffff) s += 2;
    }
    return s;
}

/* Export */
module.exports = {
    validators: validators,
    util: util
};
},{"normalize-date":2}],2:[function(require,module,exports){
'use strict';

function setTimezoneOffset(date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
}

function normalizeDateTime(date) {
    if (!date) {
        return new Date(date);
    }

    if (arguments.length > 1) {
        date = Array.prototype.slice.call(arguments);
    }

    if (Array.isArray(date)) {
        date = new (Function.prototype.bind.apply(Date, [null].concat(date)))();
    }

    var jsDate = new Date(date);

    if (date === Object(date)) {
        //Native or Moment.js date
        var momentBaseDate = date.creationData && date.creationData().input;

        if (!(momentBaseDate && (typeof momentBaseDate === 'number' || typeof momentBaseDate === 'string' && /:.+Z|GMT|[+-]\d\d:\d\d/.test(momentBaseDate)))) {
            setTimezoneOffset(jsDate); //Any data except moment.js date from timestamp or UTC string (UTC ISO format have to contains time)
        }

        return jsDate;
    }

    if (!isNaN(jsDate) && typeof date === 'string') {
        //ISO or RFC
        if (date.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/) && date.indexOf('GMT') === -1) {
            //RFC without GMT
            setTimezoneOffset(jsDate);
        }
    } else {
        //Timestamp (always in UTC)
        jsDate = new Date(Number(String(date).split('.').join('')));
    }

    return jsDate;
}

function normalizeDate(date, options) {
    date = normalizeDateTime(date);

    return (options || {}).noTime ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) : date;
}

module.exports = normalizeDate;
},{}]},{},[1])(1)
});