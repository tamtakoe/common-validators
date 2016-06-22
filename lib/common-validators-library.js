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
    max: function max(value, comparedValue, options) {
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

    min: function min(value, comparedValue, options) {
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

    divisible: function divisible(value, comparedValue, options) {
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
    minLengthStrict: ['required', 'stringOrArray', { validator: 'custom', options: {} }, function (value, comparedValue, options) {
        if (value.length < comparedValue) {
            // return 'is too short (minimum is %{comparedValue})';
            return {
                error: 'aaadddd',
                message: 'ololo'
            };
        }
    }],

    maxLength: function maxLength(value, comparedValue, options) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length > comparedValue) {
            return 'is too long (maximum is %{comparedValue})';
        }
    },

    minLength: function minLength(value, comparedValue, options) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length < comparedValue) {
            return 'is too short (minimum is %{comparedValue})';
        }
    },

    equalLength: function equalLength(value, comparedValue, options) {
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
    pattern: function pattern(value, comparedValue, options) {
        if (isString(value) && !isEmpty(value) && !new RegExp(comparedValue).test(value)) {
            return 'does not match the pattern %{comparedValue}';
        }
    },
    format: 'pattern',

    //White and black list
    inclusion: function inclusion(value, comparedValue, options) {
        if (!isEmpty(value) && !contains(comparedValue, value)) {
            return '%{value} is not allowed';
        }
    },

    exclusion: function exclusion(value, comparedValue, options) {
        if (!isEmpty(value) && contains(comparedValue, value, true)) {
            return '%{value} is restricted';
        }
    },

    //Date and time
    maxDateTime: function maxDateTime(value, comparedValue, options) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);

            if (dateTime > comparedDateTime) {
                return 'must be earlier than %{comparedValue}';
            }
        }
    },

    maxDate: function maxDate(value, comparedValue, options) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);
            var date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date > comparedDateTime) {
                return 'must be earlier than %{comparedValue}';
            }
        }
    },

    minDateTime: function minDateTime(value, comparedValue, options) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);

            if (dateTime < comparedDateTime) {
                return 'must be no earlier than %{comparedValue}';
            }
        }
    },

    minDate: function minDate(value, comparedValue, options) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);
            var date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date < comparedDateTime) {
                return 'must be no earlier than %{comparedValue}';
            }
        }
    },

    equalDateTime: function equalDateTime(value, comparedValue, options) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(comparedValue);

            if (dateTime === comparedDateTime) {
                return 'must be equal %{comparedValue}';
            }
        }
    },

    equalDate: function equalDate(value, comparedValue, options) {
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