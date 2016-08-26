'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('odd', function() {
    it('empty is valid', function() {
        expect(validators.odd(undefined)).to.be.undefined;
    });

    it('odd is valid', function() {
        expect(validators.odd(1)).to.be.undefined;
    });

    it('even is invalid', function() {
        expect(validators.odd(0)).to.have.property('error');
    });

    it('negative is invalid', function() {
        expect(validators.odd(-1)).to.have.property('error');
    });
});