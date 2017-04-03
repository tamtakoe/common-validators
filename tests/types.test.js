'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('types', function() {
    it('value is object', function() {
        expect(validators.object({})).to.be.undefined;
        expect(validators.object([])).to.have.property('error');
        expect(validators.object('')).to.have.property('error');
        expect(validators.object(0.1)).to.have.property('error');
        expect(validators.object(0)).to.have.property('error');
        expect(validators.object(/regExp/)).to.have.property('error');
        expect(validators.object(new Date())).to.have.property('error');
        expect(validators.object(new Date('foo'))).to.have.property('error');
        expect(validators.object('2016-08-24T15:11:57.281Z')).to.have.property('error');
        expect(validators.object(true)).to.have.property('error');
        expect(validators.object(false)).to.have.property('error');
        expect(validators.object(function() {})).to.have.property('error');
        expect(validators.object(null)).to.have.property('error');
        expect(validators.object(undefined)).to.be.undefined;
    });

    it('value is array', function() {
        expect(validators.array({})).to.have.property('error');
        expect(validators.array([])).to.be.undefined;
        expect(validators.array('')).to.have.property('error');
        expect(validators.array(0.1)).to.have.property('error');
        expect(validators.array(0)).to.have.property('error');
        expect(validators.array(/regExp/)).to.have.property('error');
        expect(validators.array(new Date())).to.have.property('error');
        expect(validators.array(new Date('foo'))).to.have.property('error');
        expect(validators.array('2016-08-24T15:11:57.281Z')).to.have.property('error');
        expect(validators.array(true)).to.have.property('error');
        expect(validators.array(false)).to.have.property('error');
        expect(validators.array(function() {})).to.have.property('error');
        expect(validators.array(null)).to.have.property('error');
        expect(validators.array(undefined)).to.be.undefined;
    });

    it('value is string', function() {
        expect(validators.string({})).to.have.property('error');
        expect(validators.string([])).to.have.property('error');
        expect(validators.string('')).to.be.undefined;
        expect(validators.string(0.1)).to.have.property('error');
        expect(validators.string(0)).to.have.property('error');
        expect(validators.string(/regExp/)).to.have.property('error');
        expect(validators.string(new Date())).to.have.property('error');
        expect(validators.string(new Date('foo'))).to.have.property('error');
        expect(validators.string('2016-08-24T15:11:57.281Z')).to.be.undefined;
        expect(validators.string(true)).to.have.property('error');
        expect(validators.string(false)).to.have.property('error');
        expect(validators.string(function() {})).to.have.property('error');
        expect(validators.string(null)).to.have.property('error');
        expect(validators.string(undefined)).to.be.undefined;
    });

    it('value is number', function() {
        expect(validators.number({})).to.have.property('error');
        expect(validators.number([])).to.have.property('error');
        expect(validators.number('')).to.have.property('error');
        expect(validators.number(0.1)).to.be.undefined;
        expect(validators.number(0)).to.be.undefined;
        expect(validators.number(/regExp/)).to.have.property('error');
        expect(validators.number(new Date())).to.have.property('error');
        expect(validators.number(new Date('foo'))).to.have.property('error');
        expect(validators.number('2016-08-24T15:11:57.281Z')).to.have.property('error');
        expect(validators.number(true)).to.have.property('error');
        expect(validators.number(false)).to.have.property('error');
        expect(validators.number(function() {})).to.have.property('error');
        expect(validators.number(null)).to.have.property('error');
        expect(validators.number(undefined)).to.be.undefined;
    });

    it('value is integer', function() {
        expect(validators.integer({})).to.have.property('error');
        expect(validators.integer([])).to.have.property('error');
        expect(validators.integer('')).to.have.property('error');
        expect(validators.integer(0.1)).to.have.property('error');
        expect(validators.integer(0)).to.be.undefined;
        expect(validators.integer(/regExp/)).to.have.property('error');
        expect(validators.integer(new Date())).to.have.property('error');
        expect(validators.integer(new Date('foo'))).to.have.property('error');
        expect(validators.integer('2016-08-24T15:11:57.281Z')).to.have.property('error');
        expect(validators.integer(true)).to.have.property('error');
        expect(validators.integer(false)).to.have.property('error');
        expect(validators.integer(function() {})).to.have.property('error');
        expect(validators.integer(null)).to.have.property('error');
        expect(validators.integer(undefined)).to.be.undefined;
    });

    it('value is date', function() {
        expect(validators.date({})).to.have.property('error');
        expect(validators.date([])).to.have.property('error');
        expect(validators.date('')).to.have.property('error');
        expect(validators.date(0.1)).to.be.undefined;
        expect(validators.date(0)).to.be.undefined;
        expect(validators.date(/regExp/)).to.have.property('error');
        expect(validators.date(new Date())).to.be.undefined;
        expect(validators.date(new Date('foo'))).to.have.property('error');
        expect(validators.date('2016-08-24T15:11:57.281Z')).to.be.undefined;
        expect(validators.date(true)).to.have.property('error');
        expect(validators.date(false)).to.have.property('error');
        expect(validators.date(function() {})).to.have.property('error');
        expect(validators.date(null)).to.have.property('error');
        expect(validators.date(undefined)).to.be.undefined;
    });

    it('value is boolean', function() {
        expect(validators.boolean({})).to.have.property('error');
        expect(validators.boolean([])).to.have.property('error');
        expect(validators.boolean('')).to.have.property('error');
        expect(validators.boolean(0.1)).to.have.property('error');
        expect(validators.boolean(0)).to.have.property('error');
        expect(validators.boolean(/regExp/)).to.have.property('error');
        expect(validators.boolean(new Date())).to.have.property('error');
        expect(validators.boolean(new Date('foo'))).to.have.property('error');
        expect(validators.boolean('2016-08-24T15:11:57.281Z')).to.have.property('error');
        expect(validators.boolean(true)).to.be.undefined;
        expect(validators.boolean(false)).to.be.undefined;
        expect(validators.boolean(function() {})).to.have.property('error');
        expect(validators.boolean(null)).to.have.property('error');
        expect(validators.boolean(undefined)).to.be.undefined;
    });

    it('value is function', function() {
        expect(validators.function({})).to.have.property('error');
        expect(validators.function([])).to.have.property('error');
        expect(validators.function('')).to.have.property('error');
        expect(validators.function(0.1)).to.have.property('error');
        expect(validators.function(0)).to.have.property('error');
        expect(validators.function(/regExp/)).to.have.property('error');
        expect(validators.function(new Date())).to.have.property('error');
        expect(validators.function(new Date('foo'))).to.have.property('error');
        expect(validators.function('2016-08-24T15:11:57.281Z')).to.have.property('error');
        expect(validators.function(true)).to.have.property('error');
        expect(validators.function(false)).to.have.property('error');
        expect(validators.function(function() {})).to.be.undefined;
        expect(validators.function(null)).to.have.property('error');
        expect(validators.function(undefined)).to.be.undefined;
    });

    it('value is null', function() {
        expect(validators.null({})).to.have.property('error');
        expect(validators.null([])).to.have.property('error');
        expect(validators.null('')).to.have.property('error');
        expect(validators.null(0.1)).to.have.property('error');
        expect(validators.null(0)).to.have.property('error');
        expect(validators.null(/regExp/)).to.have.property('error');
        expect(validators.null(new Date())).to.have.property('error');
        expect(validators.null(new Date('foo'))).to.have.property('error');
        expect(validators.null('2016-08-24T15:11:57.281Z')).to.have.property('error');
        expect(validators.null(true)).to.have.property('error');
        expect(validators.null(false)).to.have.property('error');
        expect(validators.null(function() {})).to.have.property('error');
        expect(validators.null(null)).to.be.undefined;
        expect(validators.null(undefined)).to.be.undefined;
    });
});