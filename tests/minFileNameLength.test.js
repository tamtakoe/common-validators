'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('minFileNameLength', function() {
    const fileList = {
        0: {
            lastModified: 1459437496451,
            lastModifiedDate: 'Thu Mar 31 2016 18:18:16 GMT+0300 (MSK)',
            name: '012345.png',
            size: '1000',
            type: 'image/png'
        },
        1: {
            lastModified: 1459437496459,
            lastModifiedDate: 'Thu Mar 31 2016 18:18:16 GMT+0300 (MSK)',
            name: '012345678901234.jpeg',
            size: '2000',
            type: 'image/jpeg'
        },
        length: 2
    };

    it('empty is valid', function() {
        expect(validators.minFileNameLength(undefined, 30)).to.be.undefined;
    });

    it('some file name length less then minFileNameLength is invalid', function() {
        expect(validators.minFileNameLength(fileList, 15)).to.have.property('error');
    });

    it('every file name length more then minFileNameLength is valid', function() {
        expect(validators.minFileNameLength(fileList, 5)).to.be.undefined;
    });

    it('some file name length equal minFileNameLength is valid', function() {
        expect(validators.minFileNameLength(fileList, 10)).to.be.undefined;
    });
});