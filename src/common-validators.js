const validatorsLibrary = require('./common-validators-library');
const validators = require('validators-constructor')();

module.exports = validators.load(validatorsLibrary);