'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('equal', function() {
    it('empty is valid', function() {
        expect(validators.equal(undefined, true)).to.be.undefined;
    });

    it('undefined equals undefined', function() {
        expect(validators.equal(undefined, {arg: undefined})).to.be.undefined;
    });

    it('null equals null', function() {
        expect(validators.equal(null, {arg: null})).to.be.undefined;
    });

    it('true equals true', function() {
        expect(validators.equal(true, {arg: true})).to.be.undefined;
    });

    it('false equals false', function() {
        expect(validators.equal(false, {arg: false})).to.be.undefined;
    });

    it('str equals str', function() {
        expect(validators.equal('str', 'str')).to.be.undefined;
    });

    it('object equals the same object', function() {
        expect(validators.equal({a: {b: 1}, c: 2}, {arg: {c: 2, a: {b: 1}}})).to.be.undefined;
    });

    it('array equals the same array', function() {
        expect(validators.equal([1, 2, {a: 3}], [1, 2, {a: 3}])).to.be.undefined;
    });

    it('1 equals true in none strict mode', function() {
        expect(validators.equal(1, {arg: true, strict: false})).to.be.undefined;
    });

    it('0 equals false in none strict mode', function() {
        expect(validators.equal(0, {arg: false, strict: false})).to.be.undefined;
    });

    it('number equals "number" in none strict mode', function() {
        expect(validators.equal(1, '1', {strict: false})).to.be.undefined;
    });

    it('not equal', function() {
        expect(validators.equal(true, false)).to.have.property('error');
    });
});