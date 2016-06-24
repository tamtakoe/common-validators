'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

// console.log('===', validators.range(8, {from: 3, to: 7}));
// console.log('===', validators.required(null, {message: '%{value} is empty'}));
// console.log('===', validators.maxLength('aaaaa', 3));
// console.log('===', validators.pattern('abcd', /ah/g));
// console.log('===', validators.minDate(new Date(0), {comparedValue: new Date(1000000000000), parse: function(v) {return v}}));

describe('test', function() {
    // it('test minLengthStrict valid', function() {
    //     expect(validators.minLengthStrict('aaa', 2)).to.be.undefined;
    // });
    //
    // it('test minLengthStrict invalid', function() {
    //     expect(validators.minLengthStrict('aaa', 5)).to.have.property('error');
    // });

    // it.only('test minLengthStrict console', function() {
    //     // var error = validators.minLengthStrict('', {comparedValue: 5, message: {error: 'aaa', message: 'bbb'}});
    //     var error = validators.minLengthStrict('www', 5);
    //     console.log(error);
    // });
});