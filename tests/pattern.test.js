'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('pattern', function() {
    it('empty is valid', function() {
        expect(validators.pattern(undefined, /abc/)).to.be.undefined;
    });

    it('matching (for RegExp pattern) string is valid', function() {
        expect(validators.pattern('0abc1', /abc/)).to.be.undefined;
    });

    it('matching (for string pattern) string is valid', function() {
        expect(validators.pattern('0abc1', 'abc')).to.be.undefined;
    });

    it('not matching string is invalid', function() {
        expect(validators.pattern('0abc1', /abcd/)).to.have.property('error');
    });
});