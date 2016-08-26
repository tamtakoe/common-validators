'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('equalLength', function() {
    it('empty is valid', function() {
        expect(validators.equalLength(undefined, 5)).to.be.undefined;
    });
    
    it('number has zero length', function() {
        expect(validators.equalLength(123456, 0)).to.be.undefined;
    });

    it('string has equal length', function() {
        expect(validators.equalLength('12345', 5)).to.be.undefined;
    });

    it('string doesn\'t have equal length', function() {
        expect(validators.equalLength('1234', 5)).to.have.property('error');
        expect(validators.equalLength('123456', 5)).to.have.property('error');
    });

    it('unicode string is correct value', function() {
        expect(validators.equalLength('\u0041\u0042\u0043\u0044\u0045', 5)).to.be.undefined;
    });

    it('array is correct value', function() {
        expect(validators.equalLength([1,2,3,4,5], 5)).to.be.undefined;
    });

    it('array-like is correct value', function() {
        expect(validators.equalLength({0: 'a', 1:'b', length: 5}, 5)).to.be.undefined;
    });

    it('object is correct value', function() {
        expect(validators.equalLength({a: 1, b: 2, c: 3, d: 4, e: 5}, 5)).to.be.undefined;
    });
});