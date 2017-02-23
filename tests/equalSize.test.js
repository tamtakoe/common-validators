'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('equalSize', function() {
    it('empty is valid', function() {
        expect(validators.equalSize(undefined, 5)).to.be.undefined;
    });

    it('string has equal size', function() {
        expect(validators.equalSize('я ♥ you', 10)).to.be.undefined;
    });

    it('string doesn\'t have equal size', function() {
        expect(validators.equalSize('я ♥ you', 9)).to.have.property('error');
        expect(validators.equalSize('я ♥ you', 11)).to.have.property('error');
    });

    it('number is correct value', function() {
        expect(validators.equalSize(12345, 5)).to.be.undefined;
    });

    it('unicode string is correct value', function() {
        expect(validators.equalSize('\u0041\u0042\u0043\u0044\u0045', 5)).to.be.undefined;
    });

    it('array is correct value', function() {
        expect(validators.equalSize(['я', '♥', 'you'], 18)).to.be.undefined;
    });
    
    it('object is correct value', function() {
        expect(validators.equalSize({a: 'я', b: '♥', c: 'you'}, 30)).to.be.undefined;
    });

    it('custom stringify method', function() {
        function toString(value) {
            if (typeof value.toString === 'function') {
                return value.toString();
            }

            return JSON.stringify(value);
        }
        expect(validators.equalSize(['я', '♥', 'you'], 10, {stringify: toString})).to.be.undefined;
    });
});