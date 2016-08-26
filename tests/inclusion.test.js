'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('inclusion', function() {
    it('value is in array', function() {
        expect(validators.inclusion('a', ['a', 'b', 'c'])).to.be.undefined;
    });

    it('value is in object keys', function() {
        expect(validators.inclusion('a', {a: 'smth'})).to.be.undefined;
    });

    it('array is in array', function() {
        expect(validators.inclusion(['a', 'b'], ['a', 'b', 'c'])).to.be.undefined;
    });

    it('object keys are in object keys', function() {
        expect(validators.inclusion({a: 1, b: 2}, {a: 1, b: 2, c: 3})).to.be.undefined;
    });

    it('value doesn\'t in array', function() {
        expect(validators.inclusion('d', ['a', 'b', 'c'])).to.have.property('error');
    });

    it('value doesn\'t in object keys', function() {
        expect(validators.inclusion('d', {a: 'smth'})).to.have.property('error');
    });

    it('array doesn\'t in array', function() {
        expect(validators.inclusion(['d', 'b'], ['a', 'b', 'c'])).to.have.property('error');
    });

    it('object keys don\'t in object keys', function() {
        expect(validators.inclusion({d: 1, b: 2}, {a: 1, b: 2, c: 3})).to.have.property('error');
    });
});