'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('minFileSizeAll', function() {
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
        expect(validators.minFileSizeAll(undefined, 4000)).to.be.undefined;
    });

    it('total files size less then minFileSizeAll is invalid', function() {
        expect(validators.minFileSizeAll(fileList, 3500)).to.have.property('error');
    });

    it('total file size more then minFileSizeAll is valid', function() {
        expect(validators.minFileSizeAll(fileList, 2500)).to.be.undefined;
    });

    it('total file size equal minFileSizeAll is valid', function() {
        expect(validators.minFileSizeAll(fileList, 3000)).to.be.undefined;
    });
});