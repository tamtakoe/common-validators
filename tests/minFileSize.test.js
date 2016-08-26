'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('minFileSize', function() {
    const fileList = {
        0: {
            lastModified: 1459437496451,
            lastModifiedDate: 'Thu Mar 31 2016 18:18:16 GMT+0300 (MSK)',
            name: '0123456789.png',
            size: '1000',
            type: 'image/png'
        },
        1: {
            lastModified: 1459437496459,
            lastModifiedDate: 'Thu Mar 31 2016 18:18:16 GMT+0300 (MSK)',
            name: '01234567890123456789.jpeg',
            size: '2000',
            type: 'image/jpeg'
        },
        length: 2
    };

    it('empty is valid', function() {
        expect(validators.minFileSize(undefined, 3000)).to.be.undefined;
    });

    it('some file size less then minFileSize is invalid', function() {
        expect(validators.minFileSize(fileList, 1500)).to.have.property('error');
    });

    it('every file size more then minFileSize is valid', function() {
        expect(validators.minFileSize(fileList, 500)).to.be.undefined;
    });

    it('some file size equal minFileSize is valid', function() {
        expect(validators.minFileSize(fileList, 1000)).to.be.undefined;
    });
});