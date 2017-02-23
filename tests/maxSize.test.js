'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('maxSize', function() {
    it('empty is valid', function() {
        expect(validators.maxSize(undefined, 5)).to.be.undefined;
    });

    it('size less then max is valid', function() {
        expect(validators.maxSize('я ♥ you', 11)).to.be.undefined;
    });

    it('size more then max is invalid', function() {
        expect(validators.maxSize('я ♥ you', 9)).to.have.property('error');
    });

    it('size equal max is valid', function() {
        expect(validators.maxSize('я ♥ you', 10)).to.be.undefined;
    });

    it('number is correct value', function() {
        expect(validators.maxSize(12345, 5)).to.be.undefined;
        expect(validators.maxSize(12345, 4)).to.have.property('error');
    });

    it('unicode string is correct value', function() {
        expect(validators.maxSize('\u0041\u0042\u0043\u0044', 5)).to.be.undefined;
        expect(validators.maxSize('\u0041\u0042\u0043\u0044\u0045\u0046', 5)).to.have.property('error');
    });

    it('array is correct value', function() {
        expect(validators.maxSize(['я', '♥', 'you'], 18)).to.be.undefined;
        expect(validators.maxSize(['я', '♥', 'you'], 17)).to.have.property('error');
    });
    
    it('object is correct value', function() {
        expect(validators.maxSize({a: 'я', b: '♥', c: 'you'}, 30)).to.be.undefined;
        expect(validators.maxSize({a: 'я', b: '♥', c: 'you'}, 29)).to.have.property('error');
    });

    it('custom stringify method', function() {
        function toString(value) {
            if (typeof value.toString === 'function') {
                return value.toString();
            } 
            
            return JSON.stringify(value);
        }
        expect(validators.maxSize(['я', '♥', 'you'], 10, {stringify: toString})).to.be.undefined;
        expect(validators.maxSize(['я', '♥', 'you'], 9, {stringify: toString})).to.have.property('error');
    });
});