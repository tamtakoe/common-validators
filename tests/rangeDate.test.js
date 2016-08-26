'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const validators = require('../src/common-validators');

describe('rangeDate', function() {
    it('empty is valid', function() {
        expect(validators.rangeDate(undefined, new Date())).to.be.undefined;
    });

    it('not date is invalid', function() {
        expect(validators.rangeDate('abc', {from: new Date(0), to: new Date()})).to.have.property('error');
        expect(validators.rangeDate({a: 1}, {from: new Date(0), to: new Date()})).to.have.property('error');
        expect(validators.rangeDate([1,2,3], {from: new Date(0), to: new Date()})).to.have.property('error');
    });

    it('date in range is valid', function() {
        expect(validators.rangeDate(new Date(2000, 0, 4, 23, 59, 59, 0), {from: new Date(2000, 0, 3), to: new Date(2000, 0, 5)})).to.be.undefined;
    });

    it('date less then range is invalid', function() {
        expect(validators.rangeDate(new Date(2000, 0, 2, 23, 59, 59, 0), {from: new Date(2000, 0, 3), to: new Date(2000, 0, 5)})).to.have.property('error');
    });

    it('date more then range is invalid', function() {
        expect(validators.rangeDate(new Date(2000, 0, 6, 23, 59, 59, 0), {from: new Date(2000, 0, 3), to: new Date(2000, 0, 5)})).to.have.property('error');
    });

    it('date equal left end of the range is valid', function() {
        expect(validators.rangeDate(new Date(2000, 0, 3, 23, 59, 59, 0), {from: new Date(2000, 0, 3), to: new Date(2000, 0, 5)})).to.be.undefined;
    });

    it('date equal left end of the range is invalid if fromNotInclusive=true', function() {
        expect(validators.rangeDate(new Date(2000, 0, 3, 23, 59, 59, 0), {from: new Date(2000, 0, 3), to: new Date(2000, 0, 5), fromNotInclusive: true})).to.have.property('error');
    });

    it('date equal right end of the range is valid', function() {
        expect(validators.rangeDate(new Date(2000, 0, 5, 23, 59, 59, 0), {from: new Date(2000, 0, 3), to: new Date(2000, 0, 5)})).to.be.undefined;
    });

    it('date equal right end of the range is invalid if toNotInclusive=true', function() {
        expect(validators.rangeDate(new Date(2000, 0, 5, 23, 59, 59, 0), {from: new Date(2000, 0, 3), to: new Date(2000, 0, 5), toNotInclusive: true})).to.have.property('error');
    });

    it('date equal left end of the range is invalid if notInclusive=true', function() {
        expect(validators.rangeDate(new Date(2000, 0, 3,23, 59, 59, 0), {from: new Date(2000, 0, 3), to: new Date(2000, 0, 5), notInclusive: true})).to.have.property('error');
    });

    it('date equal right end of the range is invalid if notInclusive=true', function() {
        expect(validators.rangeDate(new Date(2000, 0, 5, 23, 59, 59, 0), {from: new Date(2000, 0, 3), to: new Date(2000, 0, 5), notInclusive: true})).to.have.property('error');
    });

    it('date in GMT format is correct', function() {
        expect(validators.rangeDate('Sat Jan 04 2000 23:59:59 GMT+0300 (MSK)', {from: 'Sat Jan 03 2000 GMT+0300 (MSK)', to: 'Sat Jan 05 2000 GMT+0300 (MSK)'})).to.be.undefined;
        expect(validators.rangeDate('Sat Jan 02 2000 23:59:59 GMT+0300 (MSK)', {from: 'Sat Jan 03 2000 GMT+0300 (MSK)', to: 'Sat Jan 05 2000 GMT+0300 (MSK)'})).to.have.property('error');
        expect(validators.rangeDate('Sat Jan 06 2000 23:59:59 GMT+0300 (MSK)', {from: 'Sat Jan 03 2000 GMT+0300 (MSK)', to: 'Sat Jan 05 2000 GMT+0300 (MSK)'})).to.have.property('error');
    });

    it('date in ISO format is correct', function() { //+UTC
        expect(validators.rangeDate('2000-01-04T23:59:59.000Z', {from: '2000-01-04Z', to: '2000-01-06Z'})).to.be.undefined;
        expect(validators.rangeDate('2000-01-02T23:59:59.000Z', {from: '2000-01-04Z', to: '2000-01-06Z'})).to.have.property('error');
        expect(validators.rangeDate('2000-01-06T23:59:59.000Z', {from: '2000-01-04Z', to: '2000-01-06Z'})).to.have.property('error');
    });

    it('date in time format is correct', function() { //+UTC
        expect(validators.rangeDate(947030399000, {from: 946944000000, to: 947116800000})).to.be.undefined;
        expect(validators.rangeDate(946857599000, {from: 946944000000, to: 947116800000})).to.have.property('error');
        expect(validators.rangeDate(947203199000, {from: 946944000000, to: 947116800000})).to.have.property('error');
    });

    it('date in moment.js format is correct', function() { //+UTC
        expect(validators.rangeDate(moment('2000-01-04T23:59:59.000Z'), {from: moment('2000-01-04Z'), to: moment('2000-01-06Z')})).to.be.undefined;
        expect(validators.rangeDate(moment('2000-01-02T23:59:59.000Z'), {from: moment('2000-01-04Z'), to: moment('2000-01-06Z')})).to.have.property('error');
        expect(validators.rangeDate(moment('2000-01-06T23:59:59.000Z'), {from: moment('2000-01-04Z'), to: moment('2000-01-06Z')})).to.have.property('error');
    });
});