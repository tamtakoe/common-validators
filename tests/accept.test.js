'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('accept', function() {
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
        expect(validators.accept(undefined, 'image/jpeg,image/png,.webp,video/*')).to.be.undefined;
    });

    it('separate file object is invalid', function() {
        expect(validators.min(fileList[0], 'image/jpeg,image/png,.webp,video/*')).to.have.property('error');
    });

    it('image/jpeg, image/png is valid', function() {
        expect(validators.accept(fileList, 'image/jpeg,image/png,.webp,video/*')).to.be.undefined;
    });

    it('image is invalid', function() {
        expect(validators.accept(fileList, 'image/*')).to.be.undefined;
    });

    it('.png, .jpeg is valid', function() {
        expect(validators.accept(fileList, '.png, .jpg, .jpeg')).to.be.undefined;
    });

    it('.doc is invalid', function() {
        expect(validators.accept(fileList, '.doc')).to.have.property('error');
    });

    it('image is invalid for video', function() {
        expect(validators.accept(fileList, 'video/*')).to.have.property('error');
    });
});