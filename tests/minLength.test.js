'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('minLength', function() {
    it('empty is valid', function() {
        expect(validators.minLength(undefined, 5)).to.be.undefined;
    });
    
    it('number has zero length', function() {
        expect(validators.minLength(123456, 5)).to.have.property('error');
    });

    it('length less then min is invalid', function() {
        expect(validators.minLength('1234', 5)).to.have.property('error');
    });

    it('length more then min is valid', function() {
        expect(validators.minLength('123456', 5)).to.be.undefined;
    });

    it('length equal min is valid', function() {
        expect(validators.minLength('12345', 5)).to.be.undefined;
    });

    it('unicode string is correct value', function() {
        expect(validators.minLength('\u0041\u0042\u0043\u0044', 5)).to.have.property('error');
        expect(validators.minLength('\u0041\u0042\u0043\u0044\u0045\u0046', 5)).to.be.undefined;
    });

    it('array is correct value', function() {
        expect(validators.minLength([1,2,3,4], 5)).to.have.property('error');
        expect(validators.minLength([1,2,3,4,5,6], 5)).to.be.undefined;
    });

    it('array-like is correct value', function() {
        expect(validators.minLength({0: 'a', 1:'b', length: 4}, 5)).to.have.property('error');
        expect(validators.minLength({0: 'a', 1:'b', length: 6}, 5)).to.be.undefined;
    });

    it('object is correct value', function() {
        expect(validators.minLength({a: 1, b: 2, c: 3, d: 4}, 5)).to.have.property('error');
        expect(validators.minLength({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}, 5)).to.be.undefined;
    });
});