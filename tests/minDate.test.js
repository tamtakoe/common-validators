'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const validators = require('../src/common-validators');

describe('minDate', function() {
    it('empty is valid', function() {
        expect(validators.minDate(undefined, new Date())).to.be.undefined;
    });

    it('not date is invalid', function() {
        expect(validators.minDate('abc', new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
        expect(validators.minDate({a: 1}, new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
    });

    it('date less then minDate is invalid', function() {
        expect(validators.minDate(new Date(2000, 0, 4, 23, 59, 59, 0), new Date(2000, 0, 5))).to.have.property('error');
    });

    it('date more then minDate is valid', function() {
        expect(validators.minDate(new Date(2000, 0, 6, 23, 59, 59, 0), new Date(2000, 0, 5))).to.be.undefined;
    });

    it('date equal minDate is invalid', function() {
        expect(validators.minDate(new Date(2000, 0, 5, 23, 59, 59, 0), new Date(2000, 0, 5))).to.be.undefined;
    });

    it('date equal minDate is invalid if inclusive=false', function() {
        expect(validators.minDate(new Date(2000, 0, 5, 23, 59, 59, 0), new Date(2000, 0, 5), {notInclusive: true})).to.have.property('error');
    });

    it('date in Array format is correct', function() {
        expect(validators.minDate([2000, 0, 4, 23, 59, 59, 0], [2000, 0, 5])).to.have.property('error');
        expect(validators.minDate([2000, 0, 5, 23, 59, 59, 0], [2000, 0, 5])).to.be.undefined;
        expect(validators.minDate([2000, 0, 6, 23, 59, 59, 0], [2000, 0, 5])).to.be.undefined;
    });

    it('date in GMT format is correct', function() {
        expect(validators.minDate('Sat Jan 04 2000 23:59:59 GMT+0300 (MSK)', 'Sat Jan 05 2000')).to.have.property('error');
        expect(validators.minDate('Sat Jan 05 2000 23:59:59 GMT+0300 (MSK)', 'Sat Jan 05 2000')).to.be.undefined;
        expect(validators.minDate('Sat Jan 06 2000 23:59:59 GMT+0300 (MSK)', 'Sat Jan 05 2000')).to.be.undefined;
    });

    it('date in ISO format is correct', function() {
        expect(validators.minDate('2000-01-04T23:59:59.000Z', '2000-01-05Z')).to.have.property('error');
        expect(validators.minDate('2000-01-05T23:59:59.000Z', '2000-01-05Z')).to.be.undefined;
        expect(validators.minDate('2000-01-06T23:59:59.000Z', '2000-01-05Z')).to.be.undefined;
    });

    it('date in time format is correct', function() {
        expect(validators.minDate(947030399000, 947116800000)).to.have.property('error');
        expect(validators.minDate(947105999000, 947030400000)).to.be.undefined;
        expect(validators.minDate(947203199000, 947030400000)).to.be.undefined;
    });

    it('date in moment.js format is correct', function() {
        expect(validators.minDate(moment('2000-01-04T23:59:59.000Z'), moment('2000-01-06Z'))).to.have.property('error');
        expect(validators.minDate(moment('2000-01-06T23:59:59.000Z'), moment('2000-01-05Z'))).to.be.undefined;
    });
});