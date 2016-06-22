'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('confirm', function() {
    it('empty is valid', function() {
        expect(validators.confirm(undefined, true)).to.be.undefined;
    });

    it('not plain object is valid', function() {
        expect(validators.confirm('abc', true)).to.be.undefined;
        expect(validators.confirm(123, true)).to.be.undefined;
        expect(validators.confirm([1,2,3], true)).to.be.undefined;
    });

    it('password equals confirmedPassword', function() {
        expect(validators.confirm({password: 'abc', confirmedPassword: 'abc'}, {key: 'password', comparedKey: 'confirmedPassword'})).to.be.undefined;
    });

    it('password doesn\'t equal confirmedPassword', function() {
        expect(validators.confirm({password: 'cba', confirmedPassword: 'abc'}, {key: 'password', comparedKey: 'confirmedPassword'})).to.have.property('error');


        // expect(validators.confirm('abc', {password: 'cba', confirmedPassword: 'abc', obj: obj})).to.have.property('error');
        //
        //
        //
        // expect(validators.confirm('abc', {password: 'cba', confirmedPassword: 'abc'}, {obj: obj})).to.have.property('error');
        //
        //
        //
        // validators.confirm('abc', {compareWith: 'confirmedPassword'}, 'password', allObject);
        //
        //
        //
        // validators.minLength('string', 10, 'a', object, validatorOptions);
        //
        // validators.presence('string', true, 'a', object, validatorOptions);
    });

    // var schema = {
    //     a: {
    //         minLength: 10
    //     }
    // };
    //
    // var object = {
    //     a: 'string'
    // };
});