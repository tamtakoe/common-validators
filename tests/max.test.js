'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('max', function() {
    it('empty is valid', function() {
        expect(validators.max(undefined, 5)).to.be.undefined;
    });

    it('not number is invalid', function() {
        expect(validators.max('abc', 5)).to.have.property('error');
        expect(validators.max({a: 1}, 5)).to.have.property('error');
        expect(validators.max([1,2,3], 5)).to.have.property('error');
    });

    it('number less then max is valid', function() {
        expect(validators.max(4, 5)).to.be.undefined;
    });

    it('number more then max is invalid', function() {
        expect(validators.max(6, 5)).to.have.property('error');
    });

    it('number equal max is valid', function() {
        expect(validators.max(5, 5)).to.be.undefined;
    });

    it('number equal max is invalid if notInclusive=true', function() {
        expect(validators.max(5, 5, {notInclusive: true})).to.have.property('error');
    });
});