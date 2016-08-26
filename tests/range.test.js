'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('range', function() {
    it('empty is valid', function() {
        expect(validators.range(undefined, {})).to.be.undefined;
    });

    it('not number is invalid', function() {
        expect(validators.range('abc', {})).to.have.property('error');
        expect(validators.range({a: 1}, {})).to.have.property('error');
        expect(validators.range([1,2,3], {})).to.have.property('error');
    });

    it('number in range is valid', function() {
        expect(validators.range(4, {from: 3, to: 5})).to.be.undefined;
    });

    it('number less then range is invalid', function() {
        expect(validators.range(2, {from: 3, to: 5})).to.have.property('error');
    });

    it('number more then range is invalid', function() {
        expect(validators.range(6, {from: 3, to: 5})).to.have.property('error');
    });

    it('number equal left end of the range is valid', function() {
        expect(validators.range(3, {from: 3, to: 5})).to.be.undefined;
    });

    it('number equal left end of the range is invalid if fromNotInclusive=true', function() {
        expect(validators.range(3, {from: 3, to: 5, fromNotInclusive: true})).to.have.property('error');
    });

    it('number equal right end of the range is valid', function() {
        expect(validators.range(5, {from: 3, to: 5})).to.be.undefined;
    });

    it('number equal right end of the range is invalid if toNotInclusive=true', function() {
        expect(validators.range(5, {from: 3, to: 5, toNotInclusive: true})).to.have.property('error');
    });

    it('number equal left end of the range is invalid if notInclusive=true', function() {
        expect(validators.range(3, {from: 3, to: 5, notInclusive: true})).to.have.property('error');
    });

    it('number equal right end of the range is invalid if notInclusive=true', function() {
        expect(validators.range(5, {from: 3, to: 5, notInclusive: true})).to.have.property('error');
    });
});