'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const validators = require('../src/common-validators');

describe('maxDate', function() {
    it('empty is valid', function() {
        expect(validators.maxDate(undefined, new Date())).to.be.undefined;
    });

    it('not date is invalid', function() {
        expect(validators.maxDate('abc', new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
        expect(validators.maxDate({a: 1}, new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
    });

    it('date less then maxDate is valid', function() {
        expect(validators.maxDate(new Date(2000, 0, 4, 23, 59, 59, 0), new Date(2000, 0, 5))).to.be.undefined;
    });

    it('date more then maxDate is invalid', function() {
        expect(validators.maxDate(new Date(2000, 0, 6, 23, 59, 59, 0), new Date(2000, 0, 5))).to.have.property('error');
    });

    it('date equal maxDate is valid', function() {
        expect(validators.maxDate(new Date(2000, 0, 5, 23, 59, 59, 0), new Date(2000, 0, 5))).to.be.undefined;
    });

    it('date equal maxDate is invalid if inclusive=false', function() {
        expect(validators.maxDate(new Date(2000, 0, 5, 23, 59, 59, 0), new Date(2000, 0, 5), {notInclusive: true})).to.have.property('error');
    });

    it('date in Array format is correct', function() {
        expect(validators.maxDate([2000, 0, 4, 23, 59, 59, 0], [2000, 0, 5])).to.be.undefined;
        expect(validators.maxDate([2000, 0, 5, 23, 59, 59, 0], [2000, 0, 5])).to.be.undefined;
        expect(validators.maxDate([2000, 0, 6, 23, 59, 59, 0], [2000, 0, 5])).to.have.property('error');
    });

    it('date in GMT format is correct', function() {
        expect(validators.maxDate('Sat Jan 04 2000 23:59:59 GMT+0300 (MSK)', 'Sat Jan 05 2000')).to.be.undefined;
        expect(validators.maxDate('Sat Jan 05 2000 23:59:59 GMT+0300 (MSK)', 'Sat Jan 05 2000')).to.be.undefined;
        expect(validators.maxDate('Sat Jan 06 2000 23:59:59 GMT+0300 (MSK)', 'Sat Jan 05 2000')).to.have.property('error');
    });

    it('date in ISO format is correct', function() {
        expect(validators.maxDate('2000-01-04T23:59:59.000Z', '2000-01-05Z')).to.be.undefined;
        expect(validators.maxDate('2000-01-05T23:59:59.000Z', '2000-01-05Z')).to.be.undefined;
        expect(validators.maxDate('2000-01-06T23:59:59.000Z', '2000-01-05Z')).to.have.property('error');
    });

    it('date in time format is correct', function() {
        expect(validators.maxDate(947041199000, 947041200000)).to.be.undefined;
        expect(validators.maxDate(947116799000, 947041200000)).to.be.undefined;
        expect(validators.maxDate(947213999000, 947041200000)).to.have.property('error');
    });

    it('date in moment.js format is correct', function() {
        expect(validators.maxDate(moment('2000-01-04T23:59:59.000Z'), moment('2000-01-05Z'))).to.be.undefined;
        expect(validators.maxDate(moment('2000-01-05T23:59:59.000Z'), moment('2000-01-05Z'))).to.be.undefined;
        expect(validators.maxDate(moment('2000-01-06T23:59:59.000Z'), moment('2000-01-05Z'))).to.have.property('error');
    });
});