'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('rangeSize', function() {
    it('empty is valid', function() {
        expect(validators.rangeSize(undefined, 5)).to.be.undefined;
    });

    it('size in range is valid', function() {
        expect(validators.rangeSize('я ♥ you', {from: 9, to: 11})).to.be.undefined;
        expect(validators.rangeSize('я ♥ you', {from: 10, to: 11})).to.be.undefined;
        expect(validators.rangeSize('я ♥ you', {from: 9, to: 10})).to.be.undefined;
    });

    it('size less then range is invalid', function() {
        expect(validators.rangeSize('я ♥ you', {from: 7, to: 9})).to.have.property('error');
    });

    it('size more then range is invalid', function() {
        expect(validators.rangeSize('я ♥ you', {from: 11, to: 13})).to.have.property('error');
    });

    it('number is correct value', function() {
        expect(validators.rangeSize(1234, {from: 3, to: 5})).to.be.undefined;
        expect(validators.rangeSize(12, {from: 3, to: 5})).to.have.property('error');
        expect(validators.rangeSize(123456, {from: 3, to: 5})).to.have.property('error');
    });


    it('unicode string is correct value', function() {
        expect(validators.rangeSize('\u0041\u0042\u0043\u0044', {from: 3, to: 5})).to.be.undefined;
        expect(validators.rangeSize('\u0041\u0042', {from: 3, to: 5})).to.have.property('error');
        expect(validators.rangeSize('\u0041\u0042\u0043\u0044\u0045\u0046', {from: 3, to: 5})).to.have.property('error');
    });


    it('array is correct value', function() {
        expect(validators.rangeSize(['я', '♥', 'you'], {from: 17, to: 19})).to.be.undefined;
        expect(validators.rangeSize(['я', '♥', 'you'], {from: 15, to: 17})).to.have.property('error');
        expect(validators.rangeSize(['я', '♥', 'you'], {from: 19, to: 21})).to.have.property('error');
    });

    it('object is correct value', function() {
        expect(validators.rangeSize({a: 'я', b: '♥', c: 'you'}, {from: 29, to: 31})).to.be.undefined;
        expect(validators.rangeSize({a: 'я', b: '♥', c: 'you'}, {from: 27, to: 29})).to.have.property('error');
        expect(validators.rangeSize({a: 'я', b: '♥', c: 'you'}, {from: 31, to: 33})).to.have.property('error');
    });

    it('custom stringify method', function() {
        function toString(value) {
            if (typeof value.toString === 'function') {
                return value.toString();
            }

            return JSON.stringify(value);
        }
        expect(validators.rangeSize(['я', '♥', 'you'], {from: 9, to: 11, stringify: toString})).to.be.undefined;
        expect(validators.rangeSize(['я', '♥', 'you'], {from: 7, to: 9, stringify: toString})).to.have.property('error');
        expect(validators.rangeSize(['я', '♥', 'you'], {from: 11, to: 13, stringify: toString})).to.have.property('error');
    });
});