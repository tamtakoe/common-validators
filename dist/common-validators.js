(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.commonValidators = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* Validators */

module.exports = {
    custom: function custom(value, arg, options) {
        if (typeof arg === 'function') {
            return arg(value, options);
        }
    },

    //Isn't empty
    empty: function empty(value) {
        if (isEmpty(value)) {
            return "Can't be blank";
        }
    },
    presence: 'empty',
    required: 'empty',

    //Equality
    equal: function equal(value, arg, options) {
        // var errorEmpty = this.empty(value);
        //
        // if (options.allowEmpty && errorEmpty) {
        //     return errorEmpty;
        // }
        //
        // if (!errorEmpty && !deepEqual(value, arg, options.strict)) {
        //     return 'must be equal %{arg}';
        // }

        if (!isEmpty(value) && !deepEqual(value, arg, options.strict)) {
            return 'Must be equal %{arg}';
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
            return 'Must be an object';
        }
    },

    array: function array(value) {
        if (!isArray(value)) {
            return 'Must be an array';
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

    string: function string(value) {
        if (!isString(value)) {
            return 'Must be a string';
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

    null: function _null(value) {
        if (value !== null) {
            return 'Must be a null';
        }
    },

    //Number
    max: function max(value, arg, options) {
        var inclusive = options.inclusive || options.inclusive === undefined;
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
        // if (!errorType && !errorEmpty && value > arg) {
        //     return 'is too large (maximum is %{arg})';
        // }

        if (isNumber(value) && !isEmpty(value) && (inclusive ? value > arg : value >= arg)) {
            return 'Is too large (maximum is %{arg})';
        }
    },

    min: function min(value, arg, options) {
        var inclusive = options.inclusive || options.inclusive === undefined;

        if (isNumber(value) && !isEmpty(value) && (inclusive ? value < arg : value <= arg)) {
            return 'Is too small (minimum is %{arg})';
        }
    },

    range: function range(value, options) {
        var inclusive = options.inclusive || options.inclusive === undefined;
        var fromInclusive = (options.fromInclusive || options.fromInclusive === undefined) && inclusive;
        var toInclusive = (options.toInclusive || options.toInclusive === undefined) && inclusive;

        if (isNumber(value) && !isEmpty(value)) {
            if (fromInclusive ? value < options.from : value <= options.from) {
                return {
                    error: 'range.less',
                    message: options.lessMessage || 'Is too less (should be from %{from} to %{to})'
                };
            } else if (toInclusive ? value > options.to : value >= options.to) {
                return {
                    error: 'range.many',
                    message: options.manyMessage || 'Is too many (should be from %{from} to %{to})'
                };
            }
        }
    },
    in: 'range',

    odd: function odd(value) {
        if (isNumber(value) && !isEmpty(value) && value % 2 !== 1) {
            return 'Must be odd';
        }
    },

    even: function even(value) {
        if (isNumber(value) && !isEmpty(value) && value % 2 !== 0) {
            return 'Must be even';
        }
    },

    divisible: function divisible(value, arg) {
        if (isNumber(value) && !isEmpty(value) && value % arg !== 0) {
            return 'Must be divisible by %{arg}';
        }
    },

    // minWords: function () {
    //     if ((isString(value) && !isEmpty(value) && value.length > arg) {
    //         return 'Is too long (maximum is %{arg})';
    //     }
    // },

    stringOrArray: function stringOrArray(value) {
        if (!isString(value) && !isArray(value)) {
            return 'Must be a string or an array';
        }
    },

    //Length
    minLengthStrict: ['required', 'stringOrArray', { validator: 'custom', options: {} }, function (value, arg) {
        if (value.length < arg) {
            // return 'is too short (minimum is %{arg})';
            return {
                error: 'aaadddd',
                message: 'ololo'
            };
        }
    }],

    maxLength: function maxLength(value, arg) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length > arg) {
            return 'Is too long (maximum is %{arg})';
        }
    },

    minLength: function minLength(value, arg) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length < arg) {
            return 'Is too short (minimum is %{arg})';
        }
    },

    equalLength: function equalLength(value, arg) {
        if ((isString(value) || isArray(value)) && !isEmpty(value) && value.length === arg) {
            return 'Has an incorrect length (must be equal %{arg})';
        }
    },

    rangeLength: function rangeLength(value, options) {
        if ((isString(value) || isArray(value)) && !isEmpty(value)) {
            if (value > options.to) {
                return {
                    error: 'rangeLength.many',
                    message: options.manyMessage || 'Is too long (should be from %{from} to %{to})'
                };
            } else if (value < options.from) {
                return {
                    error: 'rangeLength.less',
                    message: options.lessMessage || 'Is too short (should be from %{from} to %{to})'
                };
            }
        }
    },
    inLengths: 'rangeLength',

    //RegExp
    pattern: function pattern(value, arg) {
        if (isString(value) && !isEmpty(value) && !new RegExp(arg).test(value)) {
            return 'Does not match the pattern %{arg}';
        }
    },
    format: 'pattern',

    //White and black list
    inclusion: function inclusion(value, arg) {
        if (!isEmpty(value) && !contains(arg, value)) {
            return '%{value} is not allowed';
        }
    },

    exclusion: function exclusion(value, arg) {
        if (!isEmpty(value) && contains(arg, value, true)) {
            return '%{value} is restricted';
        }
    },

    //Date and time
    maxDateTime: function maxDateTime(value, arg) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(arg);

            if (dateTime > comparedDateTime) {
                return 'Must be earlier than %{arg}';
            }
        }
    },

    maxDate: function maxDate(value, arg) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(arg);
            var date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date > comparedDateTime) {
                return 'Must be earlier than %{arg}';
            }
        }
    },

    minDateTime: function minDateTime(value, arg) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(arg);

            if (dateTime < comparedDateTime) {
                return 'Must be no earlier than %{arg}';
            }
        }
    },

    minDate: function minDate(value, arg) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(arg);
            var date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date < comparedDateTime) {
                return 'Must be no earlier than %{arg}';
            }
        }
    },

    equalDateTime: function equalDateTime(value, arg) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(arg);

            if (dateTime === comparedDateTime) {
                return 'Must be equal %{arg}';
            }
        }
    },

    equalDate: function equalDate(value, arg) {
        if (isDateTime(value)) {
            var dateTime = new Date(value);
            var comparedDateTime = new Date(arg);
            var date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

            if (date === comparedDateTime) {
                return 'Must be equal %{arg}';
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
                    message: options.manyMessage || 'Is too late (must be from ' + fromDateTime.toString() + ' to ' + toDateTime.toString() + ')'
                };
            } else if (dateTime < fromDateTime) {
                return {
                    error: 'rangeDateTime.less',
                    message: options.lessMessage || 'Is too early (must be from ' + fromDateTime.toString() + ' to ' + toDateTime.toString() + ')'
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
                    message: options.manyMessage || 'Is too late (must be from ' + fromDateTime.toDateString() + ' to ' + toDateTime.toDateString() + ')'
                };
            } else if (date < fromDateTime) {
                return {
                    error: 'rangeDate.less',
                    message: options.lessMessage || 'Is too early (must be from ' + fromDateTime.toDateString() + ' to ' + toDateTime.toDateString() + ')'
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
    },

    ipAddress: function ipAddress(value, options) {
        if (isString(value) && !isEmpty(value)) {
            // var IPV4_REGEXP = /^\s*((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\s*$/;
            // var IPV6_REGEXP = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
            // var HOSTNAME_REGEXP = /^\s*((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?)\s*$/; //RFC_1123

            var IPV4_REGEXP = /^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$/;
            var IPV6_REGEXP = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
            var HOSTNAME_REGEXP = /^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$/;

            var regExps = { ipv4: IPV4_REGEXP, ipv6: IPV6_REGEXP, hostname: HOSTNAME_REGEXP };

            var isError = !Object.keys(regExps).some(function (key) {
                if (options[key] || options[key] === undefined) {
                    return regExps[key].test(value);
                }
            });

            var ipv4 = options.ipv4;
            var ipv6 = options.ipv6;
            var hostname = options.hostname;

            if (isError) {
                if (ipv4 && !ipv6 && !hostname) {
                    return {
                        error: 'ip.v4',
                        message: options.ipv4Message || 'Invalid IPv4 address'
                    };
                }

                if (ipv6 && !ipv4 && !hostname) {
                    return {
                        error: 'ip.v6',
                        message: options.ipv6Message || 'Invalid IPv6 address'
                    };
                }

                if (hostname && !ipv4 && !ipv6) {
                    return {
                        error: 'ip.hostname',
                        message: options.hostnameMessage || 'Invalid hostname'
                    };
                }

                if (ipv6 && ipv4 && !hostname) {
                    return {
                        error: 'ip.address',
                        message: options.addressMessage || 'Invalid IP address'
                    };
                }

                return 'Ivalid IP address or hostname';
            }
        }
    },

    //File
    accept: function accept(files, arg, options) {
        files = options.files || files;

        if (isFileList(files) || isArray(files)) {
            var _ret = function () {
                var filesList = toArray(files);
                var allowedTypes = (arg || '').split(',').map(function (type) {
                    return type.trim().replace('*', '');
                });
                var isError = allowedTypes.every(function (type) {
                    if (type[0] === '.') {
                        //extension
                        return filesList.map(function (file) {
                            return (file.name || '').split('.').pop();
                        }).some(function (ext) {
                            return !ext || ('.' + ext).toLowerCase() !== type;
                        });
                    } else {
                        //mime type
                        return filesList.some(function (file) {
                            return (file.type || '').indexOf(type) === -1;
                        });
                    }
                });

                if (isError) {
                    return {
                        v: 'Incorrect type of file (allowed %{arg})'
                    };
                }
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
    },
    minFileSize: function minFileSize(files, arg, options) {
        files = options.files || files;

        if ((isFileList(files) || isArray(files)) && toArray(files).some(function (file) {
            return file.size < arg;
        })) {
            return 'File size is too small (minimum is ' + formatBytes(arg) + ')';
        }
    },
    maxFileSize: function maxFileSize(files, arg, options) {
        files = options.files || files;

        if ((isFileList(files) || isArray(files)) && toArray(files).some(function (file) {
            return file.size > arg;
        })) {
            return 'File size is too large (maximum is ' + formatBytes(arg) + ')';
        }
    },
    minFileSizeAll: function minFileSizeAll(files, arg, options) {
        files = options.files || files;

        if ((isFileList(files) || isArray(files)) && toArray(files).reduce(function (prev, curr) {
            return (prev.size || prev) + curr.size;
        }) < arg) {
            return 'Files size is too small (minimum is ' + formatBytes(arg) + ')';
        }
    },
    maxFileSizeAll: function maxFileSizeAll(files, arg, options) {
        files = options.files || files;

        if ((isFileList(files) || isArray(files)) && toArray(files).reduce(function (prev, curr) {
            return (prev.size || prev) + curr.size;
        }) > arg) {
            return 'Files size is too large (maximum is ' + formatBytes(arg) + ')';
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

function isFileList(value) {
    return {}.toString.call(value) === '[object FileList]';
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

function toArray(obj) {
    return Array.prototype.slice.call(obj);
}

function formatUnits(value, divider, fractionDigits, units) {
    var exp = Math.round(Math.log(value) / Math.log(divider));
    var num = Number((value / Math.pow(divider, exp)).toFixed(fractionDigits));
    return num + ' ' + units[exp];
}

function formatBytes(value) {
    return formatUnits(value, 1024, 1, ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB']);
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
var hiddenPropertySettings = {
    enumerable: false,
    configurable: false,
    writable: true
};
var RESULT_HANDLER = 'resultHandler';
var EXCEPTION_HANDLER = 'exceptionHandler';
var ERROR_FORMAT = 'errorFormat';
var MESSAGE = 'message';

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
        var error = void 0,
            args = arguments;
        var alias = this && this.alias;
        var validatorObj = validators[name];
        var validatorAliasObj = alias ? validators[alias] : {};

        options = Object.assign({}, validatorObj.defaultOptions, validatorAliasObj.defaultOptions, options);

        if (typeof options.parse === 'function') {
            value = options.parse(value);
        }

        if (options.hasOwnProperty(validators.arg)) {
            args = [value, options[validators.arg]].concat(Array.prototype.slice.call(arguments, 1));
        }

        try {
            var resultHandler = validatorObj[RESULT_HANDLER] || validatorAliasObj[RESULT_HANDLER] || validators[RESULT_HANDLER];

            error = resultHandler(validator.apply(validators, args));
        } catch (err) {
            var exceptionHandler = validatorObj[EXCEPTION_HANDLER] || validatorAliasObj[EXCEPTION_HANDLER] || validators[EXCEPTION_HANDLER];

            if (typeof exceptionHandler === 'function') {
                error = exceptionHandler(err);
            } else {
                throw err;
            }
        }

        if (error) {
            var _ret = function () {
                var message = options[MESSAGE] || validatorObj[MESSAGE] || validatorAliasObj[MESSAGE];

                if (message) {
                    error = message;
                }

                var formattedErrorMessage = validators.formatMessage(error, Object.assign({ validator: alias || name, value: value }, options));
                var format = validatorObj[ERROR_FORMAT] || validatorAliasObj[ERROR_FORMAT] || validators[ERROR_FORMAT];

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
                    }
                    delete format.$options;

                    if (format.$origin) {
                        format = Object.assign({}, format, formattedErrorMessage);
                    }
                    delete format.$origin;

                    return {
                        v: validators.formatMessage(format, Object.assign({ validator: alias || name, value: value }, options, formattedErrorMessage))
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
 * Check that value is plain object
 *
 * @param {Any} value
 *
 * @returns {Boolean}
 */
function isPlainObject(value) {
    return {}.toString.call(value) === '[object Object]';
}

/**
 * Validators constructor
 *
 * @param {Object}          [params]
 * @param {Object}            [errorFormat] - format of validators result
 * @param {Function}          [formatStr] - for format message strings with patterns
 * @param {Function}          [resultHandler] - handle result of validation
 * @param {Function|String}   [exceptionHandler] - handle JS exceptions
 * @param {String}            [arg] - name of compared value
 *
 * @constructor
 */
function Validators(params) {
    Object.defineProperties(this, {
        errorFormat: hiddenPropertySettings,
        formatStr: hiddenPropertySettings,
        resultHandler: hiddenPropertySettings,
        exceptionHandler: hiddenPropertySettings,
        arg: hiddenPropertySettings
    });

    this.errorFormat = {
        error: '%{validator}',
        message: '%{message}',
        $options: true,
        $origin: true
    };
    this.formatStr = formatStr;
    this.resultHandler = function (result) {
        return result;
    };
    this.exceptionHandler = function (err) {
        return err;
    };
    this.arg = 'arg';

    Object.assign(this, params);
}

/**
 * @param {String} name of validator
 * @param {Function|String|Array} validator, alias or validators array
 * @param {Object} params
 *
 * @returns {Validators} Validators instance
 */
Validators.prototype.add = function (name, validator, params) {
    var _this = this;
    var validators = validator instanceof Array ? validator : [validator];
    var validate = void 0;

    if (typeof validator === 'string') {
        validate = function validate() /*value, arg, options*/{
            return _this[validator].apply({ alias: name, _this: _this }, arguments);
        };
    } else {
        validate = function validate(value /*arg, options*/) {
            var args = Array.prototype.slice.call(arguments, 2);
            var arg1 = arguments[1];
            var arg2 = arguments[2];
            var _this2 = this && this._this || _this;
            var options = isPlainObject(arg2) ? arg2 : {};

            if (arg1 != null && typeof arg1 !== 'boolean') {
                if (isPlainObject(arg1)) {
                    options = arg1;
                } else {
                    options[_this2.arg] = arg1;
                    args.shift();
                }
            }

            for (var i = 0; i < validators.length; i++) {
                var base = validators[i];

                switch (typeof base === 'undefined' ? 'undefined' : _typeof(base)) {
                    case 'function':
                        validator = validatorWrapper(_this2, name, base);break;

                    case 'string':
                        validator = _this2[base];break;

                    case 'object':
                        validator = _this2[base[0]];
                        options = Object.assign({}, options, base[1]);
                }

                var error = validator.apply(this, [value, options].concat(args));

                if (error) {
                    return error;
                }
            }
        };
    }

    Object.assign(validate, params);

    validate.curry = function () /*arg, options*/{
        var _arguments = arguments;
        //Partial application
        return function (value) {
            return validate.apply(_this, [value].concat(Array.prototype.slice.call(_arguments)));
        };
    };

    _this[name] = validate;

    return _this;
};

/**
 * @param {Object} validatorsObj. F.e. {validator1: validator1Fn, validator2: validator2Fn, ...}
 * @param {Object} params for every validator
 *
 * @returns {Validators} Validators instance
 */
Validators.prototype.load = function (validatorsObj, params) {
    var _this3 = this;

    Object.keys(validatorsObj).forEach(function (key) {
        return _this3.add(key, validatorsObj[key], params);
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
    var _this4 = this;

    if (typeof message === 'function') {
        message = message(values.value, values);
    }

    if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
        var formattedMessage = {};

        Object.keys(message).forEach(function (key) {
            return formattedMessage[_this4.formatStr(key, values)] = _this4.formatStr(message[key], values);
        });

        if (message[MESSAGE]) {
            //Show not enumerable message of JS exception
            formattedMessage[MESSAGE] = this.formatStr(message[MESSAGE], values);
        }

        return formattedMessage;
    }

    return this.formatStr(message, values);
};

module.exports = function (options) {
    return new Validators(options);
};
},{}]},{},[2])(2)
});