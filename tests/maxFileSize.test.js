'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('maxFileSize', function() {
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
        expect(validators.maxFileSize(undefined, 1000)).to.be.undefined;
    });

    it('every file size less then maxFileSize is valid', function() {
        expect(validators.maxFileSize(fileList, 2500)).to.be.undefined;
    });

    it('some file size more then maxFileSize is invalid', function() {
        expect(validators.maxFileSize(fileList, 1500)).to.have.property('error');
    });

    it('some file size equal maxFileSize is valid', function() {
        expect(validators.maxFileSize(fileList, 2000)).to.be.undefined;
    });
});