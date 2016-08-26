'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('notEmpty', function() {
    
    it('true is valid', function() {
        expect(validators.notEmpty(true)).to.be.undefined;
    });

    it('false is valid', function() {
        expect(validators.notEmpty(false)).to.be.undefined;
    });

    it('string is valid', function() {
        expect(validators.notEmpty('str')).to.be.undefined;
    });

    it('zero is valid', function() {
        expect(validators.notEmpty(0)).to.be.undefined;
    });

    it('number is valid', function() {
        expect(validators.notEmpty(1)).to.be.undefined;
    });

    it('full object is valid', function() {
        expect(validators.notEmpty({a: 1})).to.be.undefined;
    });

    it('full array is valid', function() {
        expect(validators.notEmpty([1])).to.be.undefined;
    });

    it('undefined is valid', function() {
        expect(validators.notEmpty(undefined)).to.be.undefined;
    });

    it('null is invalid', function() {
        expect(validators.notEmpty(null)).to.have.property('error');
    });

    it('empty string (or string with only spases) is invalid', function() {
        expect(validators.notEmpty('  ')).to.have.property('error');
    });

    it('empy object is invalid', function() {
        expect(validators.notEmpty({})).to.have.property('error');
    });

    it('empty array is invalid', function() {
        expect(validators.notEmpty([])).to.have.property('error');
    });
});