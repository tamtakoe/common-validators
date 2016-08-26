'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('alwaysValid', function() {
    it('always valid', function() {
        expect(validators.alwaysValid(undefined)).to.be.undefined;
    });
});