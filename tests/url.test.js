'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('url', function() {
    it('empty is valid', function() {
        expect(validators.url(undefined)).to.be.undefined;
    });

    var values = [
        [true, 'http://foo.com/blah_blah'],
        [true, 'http://foo.com/blah_blah/'],
        [true, 'http://foo.com/blah_blah_(wikipedia)'],
        [true, 'http://foo.com/blah_blah_(wikipedia)_(again)'],
        [true, 'http://www.example.com/wpstyle/?p=364'],
        [true, 'https://www.example.com/foo/?bar=baz&inga=42&quux'],
        [true, 'http://✪df.ws/123'],
        [true, 'http://userid:password@example.com:8080'],
        [true, 'http://userid:password@example.com:8080/'],
        [true, 'http://userid@example.com'],
        [true, 'http://userid@example.com/'],
        [true, 'http://userid@example.com:8080'],
        [true, 'http://userid@example.com:8080/'],
        [true, 'http://userid:password@example.com'],
        [true, 'http://userid:password@example.com/'],
        [true, 'http://142.42.1.1/'],
        [true, 'http://142.42.1.1:8080/'],
        [true, 'http://➡.ws/䨹'],
        [true, 'http://⌘.ws'],
        [true, 'http://⌘.ws/'],
        [true, 'http://foo.com/blah_(wikipedia)#cite-1'],
        [true, 'http://foo.com/blah_(wikipedia)_blah#cite-1'],
        [true, 'http://foo.com/unicode_(✪)_in_parens'],
        [true, 'http://foo.com/(something)?after=parens'],
        [true, 'http://☺.damowmow.com/'],
        [true, 'http://code.google.com/events/#&product=browser'],
        [true, 'http://j.mp'],
        [true, 'http://foo.bar/?q=Test%20URL-encoded%20stuff'],
        [true, 'http://مثال.إختبار'],
        [true, 'http://例子.测试'],
        [true, 'http://उदाहरण.परीक्षा'],
        [true, "http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com"],
        [true, 'http://1337.net'],
        [true, 'http://a.b-c.de'],
        [true, 'http://223.255.255.254'],
        [false, 'http://'],
        [false, 'http://.'],
        [false, 'http://..'],
        [false, 'http://../'],
        [false, 'http://?'],
        [false, 'http://??'],
        [false, 'http://??/'],
        [false, 'http://#'],
        [false, 'http://##'],
        [false, 'http://##/'],
        [false, 'http://foo.bar?q=Spaces should be encoded'],
        [false, '//'],
        [false, '//a'],
        [false, '///a'],
        [false, '///'],
        [false, 'http:///a'],
        [false, 'foo.com'],
        [false, 'rdar://1234'],
        [false, 'h://test'],
        [false, 'http:// shouldfail.com'],
        [false, ':// should fail'],
        [false, 'http://foo.bar/foo(bar)baz quux'],
        [false, 'ftps://foo.bar/'],
        [false, 'http://-error-.invalid/'],
        [false, 'http://a.b--c.de/'],
        [false, 'http://-a.b.co'],
        [false, 'http://a.b-.co'],
        [false, 'http://0.0.0.0'],
        [false, 'http://10.1.1.0'],
        [false, 'http://10.1.1.255'],
        [false, 'http://224.1.1.1'],
        [false, 'http://1.1.1.1.1'],
        [false, 'http://123.123.123'],
        [false, 'http://3628126748'],
        [false, 'http://.www.foo.bar/'],
        [false, 'http://www.foo.bar./'],
        [false, 'http://.www.foo.bar./'],
        [false, 'http://10.1.1.1'],
        [false, 'http://localhost'],
        [true, 'http://10.1.1.1', {allowLocal: true}],
        [true, 'http://172.16.1.123', {allowLocal: true}],
        [true, 'http://192.168.1.123', {allowLocal: true}],
        [true, 'http://localhost/foo', {allowLocal: true}],
        [true, 'http://localhost:4711/foo', {allowLocal: true}],
        [true, 'http://servername01:8153/go/cctray.xml', {allowLocal: true}],
        [true, 'http://nicklas:password@localhost:4711/foo', {allowLocal: true}],
        [true, 'ftp://foo.bar.com', {protocols: ['ftp', 'jdbc']}],
        [true, 'jdbc://foo.bar.com', {protocols: ['ftp', 'jdbc']}],
        [false, 'http://foo.bar.com', {protocols: ['ftp', 'jdbc']}]
    ];

    values.forEach(value => {
        it(value[1] + (value[2] ? ' ' + JSON.stringify(value[2]) : '') + ' is ' + (value[0] ? 'valid' : 'invalid'), function() {
            if (value[0]) {
                expect(validators.url(value[1], value[2])).to.be.undefined;
            } else {
                expect(validators.url(value[1], value[2])).to.have.property('error');
            }
        });

    });
});