const validatorsLibrary = require('./common-validators-library');
const validators = require('validators-constructor')();

validators.util = validatorsLibrary.util;

module.exports = validators.add(validatorsLibrary.validators);