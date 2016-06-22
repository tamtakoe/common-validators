(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.commonValidators = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* Validators */

module.exports = {
    custom: function custom(value, options) {
        if (typeof options.validate === 'function') {
            return options.validate(value, options);
        }
    },

    //Isn't empty
    empty: function empty(value) {
        if (isEmpty(value)) {
            return "can't be blank";
        }
    },
    presence: 'empty',
    required: 'empty',

    //Equality
    equal: function equal(value, comparedValue, options) {
        // var errorEmpty = this.empty(value);
        //
        // if (options.allowEmpty && errorEmpty) {
        //     return errorEmpty;
        // }
        //
        // if (!errorEmpty && !deepEqual(value, comparedValue, options.strict)) {
        //     return 'must be equal %{comparedValue}';
        // }

        if (!isEmpty(value) && !deepEqual(value, comparedValue, options.strict)) {
            return 'must be equal %{comparedValue}';
        }
    },

    confirm: function confirm(value, options) {
        if (!isEmpty(value) && isPlainObject(value) && !deepEqual(value[options.key], value[options.comparedKey], options.strict)) {
            return '%{option} must be equal %{comparedOption}';
        }
    },

    // confirm1: function(value, comparedKey, options, context, allObject, path) {
    //   
    //     if (context) {
    //         if (value !== context[comparedKey]) {
    //             return 'invalid';
    //         }
    //
    //         'abc'
    //         '$.abc'
    //     }
    //  
    //
    //     var object = {
    //         a: {
    //             b: {
    //                 c: 1
    //             }
    //         },
    //         c: 1
    //     };
    //
    //
    //     1, { comparedKey: 'a.b.c' }, object, object, ['c']
    //     1, { comparedKey: 'a.b.c' }, 'c', object, globalOptions
    //
    //
    //
    //
    //     validate.single("foo@bar.com", {email: {strict: true}});
    //     validate.single("foo@bar.com", {presence: true});
    //
    //
    //     options = {
    //         key: 'c',
    //         comparedKey: 'a.b.c'
    //     };
    //
    //     if (!isEmpty(value) && isPlainObject(value) && !deepEqual(value[options.key], value[options.comparedKey], options.strict)) {
    //         return '%{option} must be equal %{comparedOption}';
    //     }
    // },

    //Types
    object: function object(value) {
        if (!isPlainObject(value)) {
            return 'must be an object';
        }
    },

    array: function array(value) {
        if (!isArray(value)) {
            return 'must be an array';
        }
    },

    number: function number(value) {
        if (!isNumber(value)) {
            return 'must be a number';
        }
    },

    integer: function integer(value) {
        if (!isInteger(value)) {
            return 'must be an integer';
        }
    },

    string: function string(value) {
        if (!isString(value)) {
            return 'must be a string';
        }
    },

    date: function date(value) {
        if (!isDateTime(value)) {
            return 'must be a valid date';
        }
    },

    boolean: function boolean(value) {
        if (!isBoolean(value)) {
            return 'must be a boolean';
        }
    },

    null: function _null(value) {
        if (value !== null) {
            return 'must be a null';
        }
    },

    //Number
    max: function max(value, comparedValue) {
        // var errorEmpty = this.empty(value);
        // var errorType = this.number(value);
        //
        // if (!options.allowEmpty && errorEmpty) {
        //     return errorEmpty;
        // }
        //
        // if (!options.allowIncorrectType && errorType) {
        //     return errorType;
        // }
        //
        // if (!errorType && !errorEmpty && value > comparedValue) {
        //     return 'is too large (maximum is %{comparedValue})';
        // }

        if (isNumber(value) && !isEmpty(value) && value > comparedValue) {
            return 'is too large (maximum is %{comparedValue})';
        }
    },

    min: function min(value, comparedValue) {
        //inclusive flag
        if (isNumber(value) && !isEmpty(value) && value < comparedValue) {
            return 'is too short (minimum is %{comparedValue})';
        }
    },

    range: function range(value, options) {
        if (isNumber(value) && !isEmpty(value)) {
            if (value > options.to) {
                return {
                    error: 'range.many',
                    message: options.manyMessage || 'is too many (should be from %{from} to %{to})'
                };
            } else if (value < options.from) {
                return {
                    error: 'range.less',
                    message: options.lessMessage || 'is too less (should be from %{from} to %{to})'
                };
            }
        }
    },
    in: 'range',

    odd: function odd(value) {
        if (isNumber(value) && !isEmpty(value) && value % 2 !== 1) {
            return 'must be odd';
        }
    },

    even: function even(value) {
        if (isNumber(value) && !isEmpty(value) && value % 2 !== 0) {
            return 'must be even';
        }
    },

    divisible: function divisible(value, comparedValue) {
        if (isNumber(value) && !isEmpty(value) && value % comparedValue !== 0) {
            return 'must be divisible by %{comparedValue}';
        }
    },

    stringOrArray: function stringOrArray(value) {
        if (!isString(value) && !isArray(value)) {
            return 'must be a string or an array';
        }
    },

    //Length
    minLengthStrict: ['required', 'stringOrArray', { validator: 'custom', options: {} }, function (value, comparedValue) {
        if (value.length < comparedValue) {
            // return 'is too short (minimum is %{comparedValue})';
            return {
                error: 'aaadddd',
                message: 'ololo'
            };
        }
    }],

    maxLength: function maxLength(value, comparedValue) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length > comparedValue) {
            return 'is too long (maximum is %{comparedValue})';
        }
    },

    minLength: function minLength(value, comparedValue) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length < comparedValue) {
            return 'is too short (minimum is %{comparedValue})';
        }
    },

    equalLength: function equalLength(value, comparedValue) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length === comparedValue) {
            return 'has an incorrect length (must be equal %{comparedValue})';
        }
    },

    rangeLength: function rangeLength(value, options) {
        if ((isString(value) || isArray(value)) && !isEmpty(value)) {
            if (value > options.to) {
                return {
                    error: 'rangeLength.many',
                    message: options.manyMessage || 'is too long (should be from %{from} to %{to})'
                };
            } else if (value < options.from) {
                return {
                    error: 'rangeLength.less',
                    message: options.lessMessage || 'is too short (should be from %{from} to %{to})'
                };
            }
        }
    },
    inLengths: 'rangeLength',

    //RegExp
    pattern: function pattern(value, comparedValue) {
        if (isString(value) && !isEmpty(value) && !new RegExp(comparedValue).test(value)) {
            return 'does not match the pattern %{comparedValue}';
        }
    },
    format: 'pattern',

    //White and black list
    inclusion: function inclusion(value, comparedValue) {
        if (!isEmpty(value) && !contains(comparedValue, value)) {
            return '%{value} is not allowed';
        }
    },

    exclusion: function exclusion(value, comparedValue) {
        if (!isEmpty(value) && contains(comparedValue, value, true)) {
            return '%{value} is restricted';
        }
    },

    //Date and time
    maxDateTime: function maxDateTime(value, comparedValue) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);

            if (dateTime > comparedDateTime) {
                return 'must be earlier than %{comparedValue}';
            }
        }
    },

    maxDate: function maxDate(value, comparedValue) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);
            var date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date > comparedDateTime) {
                return 'must be earlier than %{comparedValue}';
            }
        }
    },

    minDateTime: function minDateTime(value, comparedValue) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);

            if (dateTime < comparedDateTime) {
                return 'must be no earlier than %{comparedValue}';
            }
        }
    },

    minDate: function minDate(value, comparedValue) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);
            var date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date < comparedDateTime) {
                return 'must be no earlier than %{comparedValue}';
            }
        }
    },

    equalDateTime: function equalDateTime(value, comparedValue) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);

            if (dateTime === comparedDateTime) {
                return 'must be equal %{comparedValue}';
            }
        }
    },

    equalDate: function equalDate(value, comparedValue) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);
            var date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date === comparedDateTime) {
                return 'must be equal %{comparedValue}';
            }
        }
    },

    rangeDateTime: function rangeDateTime(value, options) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var fromDateTime = new Date(options.from);
            var toDateTime = new Date(options.to);

            if (dateTime > toDateTime) {
                return {
                    error: 'rangeDateTime.many',
                    message: options.manyMessage || 'is too late (must be from ' + fromDateTime.toString() + ' to ' + toDateTime.toString() + ')'
                };
            } else if (dateTime < fromDateTime) {
                return {
                    error: 'rangeDateTime.less',
                    message: options.lessMessage || 'is too early (must be from ' + fromDateTime.toString() + ' to ' + toDateTime.toString() + ')'
                };
            }
        }
    },
    inDateTimes: 'rangeDateTime',

    rangeDate: function rangeDate(value, options) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var fromDateTime = new Date(options.from);
            var toDateTime = new Date(options.to);
            var date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date > toDateTime) {
                return {
                    error: 'rangeDate.many',
                    message: options.manyMessage || 'is too late (must be from ' + fromDateTime.toDateString() + ' to ' + toDateTime.toDateString() + ')'
                };
            } else if (date < fromDateTime) {
                return {
                    error: 'rangeDate.less',
                    message: options.lessMessage || 'is too early (must be from ' + fromDateTime.toDateString() + ' to ' + toDateTime.toDateString() + ')'
                };
            }
        }
    },
    inDates: 'rangeDate',

    //Web
    email: function email(value) {
        var PATTERN = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

        if (isString(value) && !isEmpty(value) && !PATTERN.exec(value)) {
            return 'is not a valid email';
        }
    },

    // A URL validator that is used to validate URLs with the ability to
    // restrict schemes and some domains.
    url: function url(value, options) {
        if (isString(value) && !isEmpty(value)) {
            var schemes = options.schemes || ['http', 'https'];

            // https://gist.github.com/dperini/729294
            var regex = '^' +
            // schemes
            '(?:(?:' + schemes.join('|') + '):\\/\\/)' +
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

            if (!PATTERN.exec(value)) {
                return 'is not a valid url';
            }
        }
    }
};

/* Utils */

// Checks if the value is a number. This function does not consider NaN a
// number like many other `isNumber` functions do.
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

// Returns false if the object is not a function
function isFunction(value) {
    return typeof value === 'function';
}

// A simple check to verify that the value is an integer. Uses `isNumber`
// and a simple modulo check.
function isInteger(value) {
    return isNumber(value) && value % 1 === 0;
}

// Checks if the value is a boolean
function isBoolean(value) {
    return typeof value === 'boolean';
}

// Uses the `Object` function to check if the given argument is an object.
function isObject(obj) {
    return obj === Object(obj);
}

function isPlainObject(value) {
    return {}.toString.call(value) === '[object Object]';
}

function isArray(value) {
    return {}.toString.call(value) === '[object Array]';
}

// Simply checks if the object is an instance of a date
function isDate(obj) {
    return obj instanceof Date;
}

function isDateTime(value) {
    return !isNaN(Date.parse(value));
}

function isString(value) {
    return typeof value === 'string';
}

// Returns false if the object is `null` of `undefined`
function isDefined(obj) {
    return obj !== null && obj !== undefined;
}

function isEmpty(value) {
    var attr;

    // Null and undefined are empty
    if (!isDefined(value)) {
        return true;
    }

    // functions are non empty
    if (isFunction(value)) {
        return false;
    }

    // Whitespace only strings are empty
    if (isString(value)) {
        return (/^\s*$/.test(value)
        ); //empty string test
    }

    // For arrays we use the length property
    if (isArray(value)) {
        return value.length === 0;
    }

    // Dates have no attributes but aren't empty
    if (isDate(value)) {
        return false;
    }

    // If we find at least one property we consider it non empty
    if (isObject(value)) {
        for (attr in value) {
            return false;
        }
        return true;
    }

    return false;
}

function contains(obj, value, some) {
    some = some ? 'some' : 'every';

    if (!isDefined(obj)) {
        return false;
    }
    if (isArray(value)) {
        return value[some](function (val) {
            return contains(obj, val);
        });
    }
    if (isPlainObject(value)) {
        return Object.keys(value)[some](function (key) {
            if (isArray(obj)) {
                return obj.indexOf(key) !== -1;
            }
            return obj[key] === value[key];
        });
    }
    if (isArray(obj)) {
        return obj.indexOf(value) !== -1;
    }
    return value in obj;
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
},{}],2:[function(require,module,exports){
'use strict';

var validatorsLibrary = require('./common-validators-library');
var validators = require('validators-constructor')();

module.exports = validators.load(validatorsLibrary);
},{"./common-validators-library":1,"validators-constructor":3}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var FORMAT_REGEXP = /(%?)%\{([^\}]+)\}/g; // Finds %{key} style patterns in the given string
var MESSAGE_REGEXP = /message/i;
var COMPARED_VALUE = 'comparedValue';
var hiddenPropertySettings = {
    enumerable: false,
    configurable: false,
    writable: true
};

/**
 * Add extra advantages to validator
 *
 * @param {Object}   validators - validators library
 * @param {String}   name - validator's name
 * @param {Function} validator - user validator
 *
 * @returns {Function} extended validator
 */
function validatorWrapper(validators, name, validator) {
    return function (value, options) {
        var _this = this;

        var args = arguments;
        var validatorObj = validators[name];
        var validatorAliasObj = this.alias ? validators[this.alias] : {};

        options = Object.assign({}, validatorObj.defaultOptions, validatorAliasObj.defaultOptions, options);

        if (typeof options.parse === 'function') {
            value = options.parse(value);
        }

        if (options.hasOwnProperty(COMPARED_VALUE)) {
            args = [value, options[COMPARED_VALUE]].concat(Array.prototype.slice.call(arguments, 1));
        }

        var error = validator.apply(validators, args);

        if (error) {
            var _ret = function () {
                if (options.message) {
                    error = options.message;
                }

                var formattedErrorMessage = validators.formatMessage(error, Object.assign({ value: value }, options));
                var format = validatorObj.errorFormat || validatorAliasObj.errorFormat || validators.errorFormat;

                if (format) {
                    if (typeof formattedErrorMessage === 'string') {
                        formattedErrorMessage = { message: formattedErrorMessage };
                    }

                    if (format.$options) {
                        format = Object.assign({}, format);

                        Object.keys(options).forEach(function (key) {
                            if (!MESSAGE_REGEXP.test(key) && typeof options[key] !== 'function') {
                                format[key] = options[key];
                            }
                        });
                        delete format.$options;
                    }

                    if (format.$origin) {
                        format = Object.assign({}, format, formattedErrorMessage);
                        delete format.$origin;
                    }

                    return {
                        v: validators.formatMessage(format, Object.assign({ validator: _this.alias || name, value: value }, options, formattedErrorMessage))
                    };
                }

                return {
                    v: formattedErrorMessage
                };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
    };
}

/**
 * Format string with patterns
 *
 * @param {String} str ("I'm %{age} years old")
 * @param {Object} [values] ({age: 21})
 *
 * @returns {String} formatted string ("I'm 21 years old")
 */
function formatStr(str, values) {
    values = values || {};

    if (typeof str !== 'string') {
        return str;
    }

    return str.replace(FORMAT_REGEXP, function (m0, m1, m2) {
        return m1 === '%' ? "%{" + m2 + "}" : values[m2];
    });
}

/**
 * Validators constructor
 *
 * @param {Object}   [options]
 * @param {Object}     [errorFormat] - format of validators result
 * @param {Function}   [formatStr] - for format message strings with patterns
 *
 * @constructor
 */
function Validators(options) {
    Object.defineProperties(this, {
        errorFormat: hiddenPropertySettings,
        formatStr: hiddenPropertySettings
    });

    this.errorFormat = {
        error: '%{validator}',
        message: '%{message}',
        $options: true,
        $origin: true
    };

    this.formatStr = formatStr;

    Object.assign(this, options);
}

/**
 * @param {String} name of validator
 * @param {Function|String|Array} validator, alias or validators array
 */
Validators.prototype.add = function (name, validator) {
    if (typeof validator === 'string') {
        this[name] = function () /*value, comparedValue, options*/{
            return this[validator].apply({ alias: name, _this: this }, arguments);
        };
    } else {
        var validators = validator instanceof Array ? validator : [validator];

        this[name] = function (value /*comparedValue, options*/) {
            var options = void 0;
            var args = Array.prototype.slice.call(arguments, 2);

            if (arguments[1] === undefined || {}.toString.call(arguments[1]) === '[object Object]') {
                options = arguments[1] || {};
            } else {
                options = arguments[2] || {};
                options[COMPARED_VALUE] = arguments[1];
                args.shift();
            }

            for (var i = 0; i < validators.length; i++) {
                var base = validators[i];

                switch (typeof base === 'undefined' ? 'undefined' : _typeof(base)) {
                    case 'function':
                        validator = validatorWrapper(this._this || this, name, base);break;

                    case 'string':
                        validator = this[base];break;

                    case 'object':
                        validator = this[base.validator];
                        options = Object.assign({}, options, base.options);
                }

                var error = validator.apply(this, [value, options].concat(args));

                if (error) {
                    return error;
                }
            }
        };
    }

    return this;
};

/**
 * @param {Object} validatorsObj. F.e. {validator1: validator1Fn, validator2: validator2Fn, ...}
 */
Validators.prototype.load = function (validatorsObj) {
    var _this2 = this;

    Object.keys(validatorsObj).forEach(function (key) {
        return _this2.add(key, validatorsObj[key]);
    });

    return this;
};

/**
 * Format any structure which contains pattern strings
 *
 * @param {String|Object|Function} message. Object will be processed recursively. Function will be executed
 * @param {Object} [values]
 *
 * @returns {String|Object} formatted string or object
 */
Validators.prototype.formatMessage = function (message, values) {
    var _this3 = this;

    if (typeof message === 'function') {
        message = message(values.value, values);
    }

    if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
        var _ret2 = function () {
            var formattedMessage = {};

            Object.keys(message).forEach(function (key) {
                return formattedMessage[_this3.formatStr(key, values)] = _this3.formatStr(message[key], values);
            });

            return {
                v: formattedMessage
            };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    }

    return this.formatStr(message, values);
};

module.exports = function (options) {
    return new Validators(options);
};
},{}]},{},[2])(2)
});