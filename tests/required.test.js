'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('required', function() {
    
    it('true is valid', function() {
        expect(validators.required(true)).to.be.undefined;
    });

    it('false is valid', function() {
        expect(validators.required(false)).to.be.undefined;
    });

    it('string is valid', function() {
        expect(validators.required('str')).to.be.undefined;
    });

    it('zero is valid', function() {
        expect(validators.required(0)).to.be.undefined;
    });

    it('number is valid', function() {
        expect(validators.required(1)).to.be.undefined;
    });

    it('full object is valid', function() {
        expect(validators.required({a: 1})).to.be.undefined;
    });

    it('full array is valid', function() {
        expect(validators.required([1])).to.be.undefined;
    });

    it('undefined is invalid', function() {
        expect(validators.required(undefined)).to.have.property('error');
    });

    it('null is invalid', function() {
        expect(validators.required(null)).to.have.property('error');
    });

    it('empty string (or string with only spases) is invalid', function() {
        expect(validators.required('  ')).to.have.property('error');
    });

    it('empy object is invalid', function() {
        expect(validators.required({})).to.have.property('error');
    });

    it('empty array is invalid', function() {
        expect(validators.required([])).to.have.property('error');
    });
});