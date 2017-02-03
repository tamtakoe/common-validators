'use strict';

var validatorsLibrary = require('./common-validators-library');
var validators = require('validators-constructor')();

validators.util = validatorsLibrary.util;

module.exports = validators.add(validatorsLibrary.validators);