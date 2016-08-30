'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const validators = require('../src/common-validators');

describe('equalDate', function() {
    it('empty is valid', function() {
        expect(validators.equalDate(undefined, new Date())).to.be.undefined;
    });

    it('not date is invalid', function() {
        expect(validators.equalDate('abc', new Date(''))).to.have.property('error');
        expect(validators.equalDate({a: 1}, new Date(''))).to.have.property('error');
    });

    it('dates are equal', function() {
        expect(validators.equalDate(new Date(2000, 0, 5, 23, 59, 59, 0), new Date(2000, 0, 5))).to.be.undefined;
    });

    it('dates are not equal', function() {
        expect(validators.equalDate(new Date(2000, 0, 5, 23, 59, 59, 0), new Date(2000, 0, 6))).to.have.property('error');
    });

    it('date in Array format is correct', function() {
        expect(validators.equalDate([2000, 0, 5, 0, 0, 0, 0], new Date(2000, 0, 5))).to.be.undefined;
        expect(validators.equalDate([2000, 0, 5, 0, 0, 0, 0], new Date(2000, 0, 5))).to.be.undefined;
        expect(validators.equalDate([2000, 0, 5, 23, 59, 59, 0], new Date(2000, 0, 6))).to.have.property('error');
        expect(validators.equalDate([2000, 0, 5, 23, 59, 59, 0], new Date(2000, 0, 6))).to.have.property('error');
        expect(validators.equalDate([2000, 0, 5, 23, 59, 59, 0], [2000, 0, 5])).to.be.undefined;
        expect(validators.equalDate([2000, 0, 5, 23, 59, 59, 0], [2000, 0, 6])).to.have.property('error');
    });

    it('date in GMT format is correct', function() {
        expect(validators.equalDate('Sat Jan 05 2000 00:00:00 GMT+0000', new Date(2000, 0, 5))).to.be.undefined;
        expect(validators.equalDate('Sat Jan 05 2000 00:00:00 GMT+0000', new Date(2000, 0, 6))).to.have.property('error');
        expect(validators.equalDate('Sat Jan 05 2000 23:59:59 GMT+0300 (MSK)', new Date(2000, 0, 5))).to.be.undefined;
        expect(validators.equalDate('Sat Jan 05 2000 23:59:59 GMT+0300 (MSK)', new Date(2000, 0, 6))).to.have.property('error');
        expect(validators.equalDate('Sat Jan 05 2000 23:59:59 GMT+0300 (MSK)', 'Sat Jan 05 2000')).to.be.undefined;
        expect(validators.equalDate('Sat Jan 05 2000 23:59:59 GMT+0300 (MSK)', 'Sat Jan 06 2000')).to.have.property('error');
    });

    it('date in ISO format is correct', function() {
        expect(validators.equalDate('2000-01-05T00:00:00.000Z', new Date(2000, 0, 5))).to.be.undefined;
        expect(validators.equalDate('2000-01-05T00:00:00.000Z', new Date(2000, 0, 6))).to.have.property('error');
        expect(validators.equalDate('2000-01-05T23:59:59.000Z', new Date(2000, 0, 5))).to.be.undefined;
        expect(validators.equalDate('2000-01-05T23:59:59.000Z', new Date(2000, 0, 6))).to.have.property('error');
        expect(validators.equalDate('2000-01-05T23:59:59.000Z', '2000-01-05Z')).to.be.undefined;
        expect(validators.equalDate('2000-01-05T23:59:59.000Z', '2000-01-06Z')).to.have.property('error');
    });

    it('date in time format is correct', function() {
        // It works differently on different servers https://travis-ci.org/tamtakoe/common-validators/jobs/156213007
        // expect(validators.equalDate(947105999000, new Date(2000, 0, 5))).to.be.undefined;
        // expect(validators.equalDate(947105999000, new Date(2000, 0, 6))).to.have.property('error');
        expect(validators.equalDate(947105999000, 947019600000)).to.be.undefined;
        expect(validators.equalDate(947105999000, 947106000000)).to.have.property('error');
    });

    it('date in moment.js format is correct', function() {
        expect(validators.equalDate(moment('2000-01-05T00:00:00.000Z'), new Date(2000, 0, 5))).to.be.undefined;
        expect(validators.equalDate(moment('2000-01-05T00:00:00.000Z'), new Date(2000, 0, 6))).to.have.property('error');
        expect(validators.equalDate(moment('2000-01-05T23:59:59.000Z'), new Date(2000, 0, 5))).to.be.undefined;
        expect(validators.equalDate(moment('2000-01-05T23:59:59.000Z'), new Date(2000, 0, 6))).to.have.property('error');
        expect(validators.equalDate(moment('2000-01-05T23:59:59.000Z'), moment('2000-01-05Z'))).to.be.undefined;
        expect(validators.equalDate(moment('2000-01-05T23:59:59.000Z'), moment('2000-01-06Z'))).to.have.property('error');
    });
});