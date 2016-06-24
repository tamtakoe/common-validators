'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

// console.log('===', validators.range(8, {from: 3, to: 7}));
// console.log('===', validators.required(null, {message: '%{value} is empty'}));
// console.log('===', validators.maxLength('aaaaa', 3));
// console.log('===', validators.pattern('abcd', /ah/g));
// console.log('===', validators.minDate(new Date(0), {comparedValue: new Date(1000000000000), parse: function(v) {return v}}));

describe('custom', function() {
    const options = {
        myTrue: true,
        arg: function(value, options) {
            if (value !== options.myTrue) {
                return 'not my true'
            }
        }
    };

    it('true is valid for my true', function() {
        expect(validators.custom(true, options)).to.be.undefined;
    });

    it('false is invalid for my true', function() {
        expect(validators.custom(false, options)).to.have.property('error');
    });
});