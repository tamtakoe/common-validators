'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const validators = require('../src/common-validators');

describe('maxDateTime', function() {
    it('empty is valid', function() {
        expect(validators.maxDateTime(undefined, new Date())).to.be.undefined;
    });

    it('not date is invalid', function() {
        expect(validators.maxDateTime('abc', new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
        expect(validators.maxDateTime({a: 1}, new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
        expect(validators.maxDateTime([1,2,3], new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
    });

    it('date less then maxDateTime is valid', function() {
        expect(validators.maxDateTime(new Date(2000, 0, 1, 0, 0, 4, 0), new Date(2000, 0, 1, 0, 0, 5, 0))).to.be.undefined;
    });

    it('date more then maxDateTime is invalid', function() {
        expect(validators.maxDateTime(new Date(2000, 0, 1, 0, 0, 6, 0), new Date(2000, 0, 1, 0, 0, 5, 0))).to.have.property('error');
    });

    it('date equal maxDateTime is valid', function() {
        expect(validators.maxDateTime(new Date(2000, 0, 1, 0, 0, 5, 0), new Date(2000, 0, 1, 0, 0, 5, 0))).to.be.undefined;
    });

    it('date equal maxDateTime is invalid if inclusive=false', function() {
        expect(validators.maxDateTime(new Date(2000, 0, 1, 0, 0, 5, 0), new Date(2000, 0, 1, 0, 0, 5, 0), {notInclusive: true})).to.have.property('error');
    });

    it('date in GMT format is correct', function() {
        expect(validators.maxDateTime('Sat Jan 01 2000 00:00:04 GMT+0300 (MSK)', 'Sat Jan 01 2000 00:00:05 GMT+0300 (MSK)')).to.be.undefined;
        expect(validators.maxDateTime('Sat Jan 01 2000 00:00:06 GMT+0300 (MSK)', 'Sat Jan 01 2000 00:00:05 GMT+0300 (MSK)')).to.have.property('error');
    });

    it('date in ISO format is correct', function() {
        expect(validators.maxDateTime('2000-01-01T00:00:04.000Z', '2000-01-01T00:00:05.000Z')).to.be.undefined;
        expect(validators.maxDateTime('2000-01-01T00:00:06.000Z', '2000-01-01T00:00:05.000Z')).to.have.property('error');
    });

    it('date in time format is correct', function() {
        expect(validators.maxDateTime(946674004000, 946674005000)).to.be.undefined;
        expect(validators.maxDateTime(946674006000, 946674005000)).to.have.property('error');
    });

    it('date in moment.js format is correct', function() {
        expect(validators.maxDateTime(moment('2000-01-01T00:00:04.000Z'), moment('2000-01-01T00:00:05.000Z'))).to.be.undefined;
        expect(validators.maxDateTime(moment('2000-01-01T00:00:06.000Z'), moment('2000-01-01T00:00:05.000Z'))).to.have.property('error');
    });
});