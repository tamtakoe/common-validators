'use strict';

var validatorsLibrary = require('./common-validators-library');
var validators = require('validators-constructor')();

module.exports = validators.load(validatorsLibrary);