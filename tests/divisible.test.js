'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('divisible', function() {
    it('empty is valid', function() {
        expect(validators.divisible(undefined, 5)).to.be.undefined;
    });

    it('with the remainder divided is invalid', function() {
        expect(validators.divisible(3, 2)).to.have.property('error');
    });

    it('without the remainder divided is valid', function() {
        expect(validators.divisible(4, 2)).to.be.undefined;
    });
});