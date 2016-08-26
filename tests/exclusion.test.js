'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('exclusion', function() {
    it('value doesn\'t in array', function() {
        expect(validators.exclusion('d', ['a', 'b', 'c'])).to.be.undefined;
    });

    it('value doesn\'t in object keys', function() {
        expect(validators.exclusion('d', {a: 'smth'})).to.be.undefined;
    });

    it('array doesn\'t in array', function() {
        expect(validators.exclusion(['d', 'e'], ['a', 'b', 'c'])).to.be.undefined;
    });

    it('object keys don\'t in object keys', function() {
        expect(validators.exclusion({d: 1, e: 2}, {a: 1, b: 2, c: 3})).to.be.undefined;
    });

    it('value is in array', function() {
        expect(validators.exclusion('a', ['a', 'b', 'c'])).to.have.property('error');
    });

    it('value is in object keys', function() {
        expect(validators.exclusion('a', {a: 'smth'})).to.have.property('error');
    });

    it('array is in array', function() {
        expect(validators.exclusion(['a', 'b'], ['a', 'b', 'c'])).to.have.property('error');
    });

    it('object keys are in object keys', function() {
        expect(validators.exclusion({a: 1, b: 2}, {a: 1, b: 2, c: 3})).to.have.property('error');
    });
});