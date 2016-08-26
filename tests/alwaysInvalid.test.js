'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('alwaysInvalid', function() {
    it('always invalid', function() {
        expect(validators.alwaysInvalid(undefined)).to.have.property('error');
    });
});