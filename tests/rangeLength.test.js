'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('rangeLength', function() {
    it('empty is valid', function() {
        expect(validators.rangeLength(undefined, 5)).to.be.undefined;
    });

    it('number has zero length', function() {
        expect(validators.rangeLength(123456, {from: 0, to: 1})).to.be.undefined;
    });


    it('length in range is valid', function() {
        expect(validators.rangeLength('1234', {from: 3, to: 5})).to.be.undefined;
        expect(validators.rangeLength('1234', {from: 4, to: 5})).to.be.undefined;
        expect(validators.rangeLength('1234', {from: 3, to: 4})).to.be.undefined;
    });

    it('length less then range is invalid', function() {
        expect(validators.rangeLength('12', {from: 3, to: 5})).to.have.property('error');
    });

    it('length more then range is invalid', function() {
        expect(validators.rangeLength('123456', {from: 3, to: 5})).to.have.property('error');
    });

    it('unicode string is correct value', function() {
        expect(validators.rangeLength('\u0041\u0042\u0043\u0044', {from: 3, to: 5})).to.be.undefined;
        expect(validators.rangeLength('\u0041\u0042', {from: 3, to: 5})).to.have.property('error');
        expect(validators.rangeLength('\u0041\u0042\u0043\u0044\u0045\u0046', {from: 3, to: 5})).to.have.property('error');
    });

    it('array is correct value', function() {
        expect(validators.rangeLength([1,2,3,4], {from: 3, to: 5})).to.be.undefined;
        expect(validators.rangeLength([1,2], {from: 3, to: 5})).to.have.property('error');
        expect(validators.rangeLength([1,2,3,4,5,6], {from: 3, to: 5})).to.have.property('error');
    });

    it('array-like is correct value', function() {
        expect(validators.rangeLength({0: 'a', 1:'b', length: 4}, {from: 3, to: 5})).to.be.undefined;
        expect(validators.rangeLength({0: 'a', 1:'b', length: 6}, {from: 3, to: 5})).to.have.property('error');
        expect(validators.rangeLength({0: 'a', 1:'b', length: 2}, {from: 3, to: 5})).to.have.property('error');
    });

    it('object is correct value', function() {
        expect(validators.rangeLength({a: 1, b: 2, c: 3, d: 4}, {from: 3, to: 5})).to.be.undefined;
        expect(validators.rangeLength({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}, {from: 3, to: 5})).to.have.property('error');
        expect(validators.rangeLength({a: 1, b: 2}, {from: 3, to: 5})).to.have.property('error');
    });
});