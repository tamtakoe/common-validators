'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('minSize', function() {
    it('empty is valid', function() {
        expect(validators.minSize(undefined, 5)).to.be.undefined;
    });

    it('size more then min is valid', function() {
        expect(validators.minSize('я ♥ you', 9)).to.be.undefined;
    });

    it('size less then min is invalid', function() {
        expect(validators.minSize('я ♥ you', 11)).to.have.property('error');
    });

    it('size equal min is valid', function() {
        expect(validators.minSize('я ♥ you', 10)).to.be.undefined;
    });

    it('number is correct value', function() {
        expect(validators.minSize(12345, 5)).to.be.undefined;
        expect(validators.minSize(12345, 6)).to.have.property('error');
    });

    it('unicode string is correct value', function() {
        expect(validators.minSize('\u0041\u0042\u0043\u0044\u0045\u0046', 5)).to.be.undefined;
        expect(validators.minSize('\u0041\u0042\u0043\u0044', 5)).to.have.property('error');
    });

    it('array is correct value', function() {
        expect(validators.minSize(['я', '♥', 'you'], 18)).to.be.undefined;
        expect(validators.minSize(['я', '♥', 'you'], 19)).to.have.property('error');
    });

    it('object is correct value', function() {
        expect(validators.minSize({a: 'я', b: '♥', c: 'you'}, 30)).to.be.undefined;
        expect(validators.minSize({a: 'я', b: '♥', c: 'you'}, 31)).to.have.property('error');
    });

    it('custom stringify method', function() {
        function toString(value) {
            if (typeof value.toString === 'function') {
                return value.toString();
            }

            return JSON.stringify(value);
        }
        expect(validators.minSize(['я', '♥', 'you'], 10, {stringify: toString})).to.be.undefined;
        expect(validators.minSize(['я', '♥', 'you'], 11, {stringify: toString})).to.have.property('error');
    });
});