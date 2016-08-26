'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('email', function() {
    it('empty is valid', function() {
        expect(validators.email(undefined)).to.be.undefined;
    });

    var values = [
        [true, 'nicklas@ansman.se'],
        [true, 'NiCkLaS@AnSmAn.Se'],
        [true, 'niceandsimple@example.com'],
        [true, 'very.common@example.com'],
        [true, 'a.little.lengthy.but.fine@dept.example.com'],
        [true, 'disposable.style.email.with+symbol@example.com'],
        [true, 'other.email-with-dash@example.com'],
        [true, 'üñîçøðé@example.com'],
        [true, 'foo@some.customtld'],
        [false, 'foobar'],
        [false, 'foo@bar'],
        [false, 'abc.example.com'],
        [false, 'a"b(c)d,e:f;g<h>i[j\\k]l@example.com'],
        [false, 'just"not"right@example.com'],
        [false, 'this is"not\\allowed@example.com'],
        [false, 'this\\ still\\"not\\\\allowed@example.com']
    ];

    values.forEach(value => {
        it(value[1] + ' is ' + (value[0] ? 'valid' : 'invalid'), function() {
            if (value[0]) {
                expect(validators.email(value[1])).to.be.undefined;
            } else {
                expect(validators.email(value[1])).to.have.property('error');
            }
        });

    });
});