'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const validators = require('../src/common-validators');

describe('equalDateTime', function() {
    it('empty is valid', function() {
        expect(validators.equalDateTime(undefined, new Date())).to.be.undefined;
    });

    it('not date is invalid', function() {
        expect(validators.equalDateTime('abc', new Date(''))).to.have.property('error');
        expect(validators.equalDateTime({a: 1}, new Date(''))).to.have.property('error');
    });

    it('dates are equal', function() {
        expect(validators.equalDateTime(new Date(2000, 0, 1, 0, 0, 5, 0), new Date(2000, 0, 1, 0, 0, 5, 0))).to.be.undefined;
    });

    it('dates are not equal', function() {
        expect(validators.equalDateTime(new Date(2000, 0, 1, 0, 0, 6, 0), new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
    });

    it('date in GMT format is correct', function() {
        expect(validators.equalDateTime('Sat Jan 01 2000 00:00:05 GMT+0000', new Date(2000, 0, 1, 0, 0, 5, 0))).to.be.undefined;
        expect(validators.equalDateTime('Sat Jan 01 2000 00:00:06 GMT+0000', new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
        expect(validators.equalDateTime('Sat Jan 01 2000 00:00:05 GMT+0300 (MSK)', 'Sat Jan 01 2000 00:00:05 GMT+0300 (MSK)')).to.be.undefined;
        expect(validators.equalDateTime('Sat Jan 01 2000 00:00:06 GMT+0300 (MSK)', 'Sat Jan 01 2000 00:00:05 GMT+0300 (MSK)')).to.have.property('error');
    });

    it('date in ISO format is correct', function() {
        expect(validators.equalDateTime('2000-01-01T00:00:05.000Z', new Date(2000, 0, 1, 0, 0, 5, 0))).to.be.undefined;
        expect(validators.equalDateTime('2000-01-01T00:00:06.000Z', new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
        expect(validators.equalDateTime('2000-01-01T00:00:05.000Z', '2000-01-01T00:00:05.000Z')).to.be.undefined;
        expect(validators.equalDateTime('2000-01-01T00:00:06.000Z', '2000-01-01T00:00:05.000Z')).to.have.property('error');
    });

    it('date in time format is correct', function() {
        expect(validators.equalDateTime(946674005000, new Date(2000, 0, 1, 0, 0, 5, 0))).to.be.undefined;
        expect(validators.equalDateTime(946674006000, new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
        expect(validators.equalDateTime(946674005000, 946674005000)).to.be.undefined;
        expect(validators.equalDateTime(946674006000, 946674005000)).to.have.property('error');
    });

    it('date in moment.js format is correct', function() {
        expect(validators.equalDateTime(moment('2000-01-01T00:00:05.000Z'), new Date(2000, 0, 1, 0, 0, 5, 0))).to.be.undefined;
        expect(validators.equalDateTime(moment('2000-01-01T00:00:06.000Z'), new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
        expect(validators.equalDateTime(moment('2000-01-01T00:00:05.000Z'), moment('2000-01-01T00:00:05.000Z'))).to.be.undefined;
        expect(validators.equalDateTime(moment('2000-01-01T00:00:06.000Z'), moment('2000-01-01T00:00:05.000Z'))).to.have.property('error');
    });
});