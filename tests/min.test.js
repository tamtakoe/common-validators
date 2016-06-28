'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('min', function() {
    it('empty is valid', function() {
        expect(validators.min(undefined, 5)).to.be.undefined;
    });

    it('not number is valid', function() {
        expect(validators.min('abc', 5)).to.be.undefined;
        expect(validators.min({a: 1}, 5)).to.be.undefined;
        expect(validators.min([1,2,3], 5)).to.be.undefined;
    });

    it('number more then min is valid', function() {
        expect(validators.min(6, 5)).to.be.undefined;
    });

    it('number less then min is invalid', function() {
        expect(validators.min(4, 5)).to.have.property('error');
    });

    it('number equal min is valid', function() {
        expect(validators.min(5, 5)).to.be.undefined;
    });

    it('number equal min is invalid if inclusive=false', function() {
        expect(validators.min(5, 5, {inclusive: false})).to.have.property('error');
    });
});