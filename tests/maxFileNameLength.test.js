'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('maxFileNameLength', function() {
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
        expect(validators.maxFileNameLength(undefined, 5)).to.be.undefined;
    });

    it('every file name length less then maxFileNameLength is valid', function() {
        expect(validators.maxFileNameLength(fileList, 25)).to.be.undefined;
    });

    it('some file name length more then maxFileNameLength is invalid', function() {
        expect(validators.maxFileNameLength(fileList, 15)).to.have.property('error');
    });

    it('some file name length equal maxFileNameLength is valid', function() {
        expect(validators.maxFileNameLength(fileList, 20)).to.be.undefined;
    });
});