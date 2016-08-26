'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('maxLength', function() {
    it('empty is valid', function() {
        expect(validators.maxLength(undefined, 5)).to.be.undefined;
    });
    
    it('number has zero length', function() {
        expect(validators.maxLength(123456, 5)).to.be.undefined;
    });

    it('length less then max is valid', function() {
        expect(validators.maxLength('1234', 5)).to.be.undefined;
    });

    it('length more then max is invalid', function() {
        expect(validators.maxLength('123456', 5)).to.have.property('error');
    });

    it('length equal max is valid', function() {
        expect(validators.maxLength('12345', 5)).to.be.undefined;
    });

    it('unicode string is correct value', function() {
        expect(validators.maxLength('\u0041\u0042\u0043\u0044', 5)).to.be.undefined;
        expect(validators.maxLength('\u0041\u0042\u0043\u0044\u0045\u0046', 5)).to.have.property('error');
    });

    it('array is correct value', function() {
        expect(validators.maxLength([1,2,3,4], 5)).to.be.undefined;
        expect(validators.maxLength([1,2,3,4,5,6], 5)).to.have.property('error');
    });

    it('array-like is correct value', function() {
        expect(validators.maxLength({0: 'a', 1:'b', length: 4}, 5)).to.be.undefined;
        expect(validators.maxLength({0: 'a', 1:'b', length: 6}, 5)).to.have.property('error');
    });

    it('object is correct value', function() {
        expect(validators.maxLength({a: 1, b: 2, c: 3, d: 4}, 5)).to.be.undefined;
        expect(validators.maxLength({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}, 5)).to.have.property('error');
    });
});