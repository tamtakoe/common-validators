'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const validators = require('../src/common-validators');

describe('rangeDateTime', function() {
    it('empty is valid', function() {
        expect(validators.rangeDateTime(undefined, new Date())).to.be.undefined;
    });

    it('not date is invalid', function() {
        expect(validators.rangeDateTime('abc', {from: new Date(0), to: new Date()})).to.have.property('error');
        expect(validators.rangeDateTime({a: 1}, {from: new Date(0), to: new Date()})).to.have.property('error');
        expect(validators.rangeDateTime([1,2,3], {from: new Date(0), to: new Date()})).to.have.property('error');
    });

    it('date in range is valid', function() {
        expect(validators.rangeDateTime(new Date(2000, 0, 1, 0, 0, 4, 0), {from: new Date(2000, 0, 1, 0, 0, 3, 0), to: new Date(2000, 0, 1, 0, 0, 5, 0)})).to.be.undefined;
    });

    it('date less then range is invalid', function() {
        expect(validators.rangeDateTime(new Date(2000, 0, 1, 0, 0, 2, 0), {from: new Date(2000, 0, 1, 0, 0, 3, 0), to: new Date(2000, 0, 1, 0, 0, 5, 0)})).to.have.property('error');
    });

    it('date more then range is invalid', function() {
        expect(validators.rangeDateTime(new Date(2000, 0, 1, 0, 0, 6, 0), {from: new Date(2000, 0, 1, 0, 0, 3, 0), to: new Date(2000, 0, 1, 0, 0, 5, 0)})).to.have.property('error');
    });

    it('date equal left end of the range is valid', function() {
        expect(validators.rangeDateTime(new Date(2000, 0, 1, 0, 0, 3, 0), {from: new Date(2000, 0, 1, 0, 0, 3, 0), to: new Date(2000, 0, 1, 0, 0, 5, 0)})).to.be.undefined;
    });

    it('date equal left end of the range is invalid if exclusiveFrom=true', function() {
        expect(validators.rangeDateTime(new Date(2000, 0, 1, 0, 0, 3, 0), {from: new Date(2000, 0, 1, 0, 0, 3, 0), to: new Date(2000, 0, 1, 0, 0, 5, 0), exclusiveFrom: true})).to.have.property('error');
    });

    it('date equal right end of the range is valid', function() {
        expect(validators.rangeDateTime(new Date(2000, 0, 1, 0, 0, 5, 0), {from: new Date(2000, 0, 1, 0, 0, 3, 0), to: new Date(2000, 0, 1, 0, 0, 5, 0)})).to.be.undefined;
    });

    it('date equal right end of the range is invalid if exclusiveTo=true', function() {
        expect(validators.rangeDateTime(new Date(2000, 0, 1, 0, 0, 5, 0), {from: new Date(2000, 0, 1, 0, 0, 3, 0), to: new Date(2000, 0, 1, 0, 0, 5, 0), exclusiveTo: true})).to.have.property('error');
    });

    it('date equal left end of the range is invalid if exclusive=true', function() {
        expect(validators.rangeDateTime(new Date(2000, 0, 1, 0, 0, 3, 0), {from: new Date(2000, 0, 1, 0, 0, 3, 0), to: new Date(2000, 0, 1, 0, 0, 5, 0), exclusive: true})).to.have.property('error');
    });

    it('date equal right end of the range is invalid if exclusive=true', function() {
        expect(validators.rangeDateTime(new Date(2000, 0, 1, 0, 0, 5, 0), {from: new Date(2000, 0, 1, 0, 0, 3, 0), to: new Date(2000, 0, 1, 0, 0, 5, 0), exclusive: true})).to.have.property('error');
    });
    
    it('date in GMT format is correct', function() {
        expect(validators.rangeDateTime('Sat Jan 01 2000 00:00:04 GMT+0300 (MSK)', {from: 'Sat Jan 01 2000 00:00:03 GMT+0300 (MSK)', to: 'Sat Jan 01 2000 00:00:05 GMT+0300 (MSK)'})).to.be.undefined;
        expect(validators.rangeDateTime('Sat Jan 01 2000 00:00:02 GMT+0300 (MSK)', {from: 'Sat Jan 01 2000 00:00:03 GMT+0300 (MSK)', to: 'Sat Jan 01 2000 00:00:05 GMT+0300 (MSK)'})).to.have.property('error');
        expect(validators.rangeDateTime('Sat Jan 01 2000 00:00:06 GMT+0300 (MSK)', {from: 'Sat Jan 01 2000 00:00:03 GMT+0300 (MSK)', to: 'Sat Jan 01 2000 00:00:05 GMT+0300 (MSK)'})).to.have.property('error');
    });

    it('date in ISO format is correct', function() {
        expect(validators.rangeDateTime('2000-01-01T00:00:04.000Z', {from: '2000-01-01T00:00:03.000Z', to: '2000-01-01T00:00:05.000Z'})).to.be.undefined;
        expect(validators.rangeDateTime('2000-01-01T00:00:02.000Z', {from: '2000-01-01T00:00:03.000Z', to: '2000-01-01T00:00:05.000Z'})).to.have.property('error');
        expect(validators.rangeDateTime('2000-01-01T00:00:06.000Z', {from: '2000-01-01T00:00:03.000Z', to: '2000-01-01T00:00:05.000Z'})).to.have.property('error');
    });

    it('date in time format is correct', function() {
        expect(validators.rangeDateTime(946674004000, {from: 946674003000, to: 946674005000})).to.be.undefined;
        expect(validators.rangeDateTime(946674002000, {from: 946674003000, to: 946674005000})).to.have.property('error');
        expect(validators.rangeDateTime(946674006000, {from: 946674003000, to: 946674005000})).to.have.property('error');
    });

    it('date in moment.js format is correct', function() {
        expect(validators.rangeDateTime(moment('2000-01-01T00:00:04.000Z'), {from: moment('2000-01-01T00:00:03.000Z'), to: moment('2000-01-01T00:00:05.000Z')})).to.be.undefined;
        expect(validators.rangeDateTime(moment('2000-01-01T00:00:02.000Z'), {from: moment('2000-01-01T00:00:03.000Z'), to: moment('2000-01-01T00:00:05.000Z')})).to.have.property('error');
        expect(validators.rangeDateTime(moment('2000-01-01T00:00:06.000Z'), {from: moment('2000-01-01T00:00:03.000Z'), to: moment('2000-01-01T00:00:05.000Z')})).to.have.property('error');
    });
});