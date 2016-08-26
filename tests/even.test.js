'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('even', function() {
    it('empty is valid', function() {
        expect(validators.even(undefined)).to.be.undefined;
    });

    it('even is valid', function() {
        expect(validators.even(0)).to.be.undefined;
    });

    it('odd is invalid', function() {
        expect(validators.even(1)).to.have.property('error');
    });

    it('negative is invalid', function() {
        expect(validators.even(-1)).to.have.property('error');
    });
});