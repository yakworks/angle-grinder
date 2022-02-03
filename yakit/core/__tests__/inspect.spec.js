/* eslint-disable */
import {isString, isPlainObject} from '../is';
import {expect as x} from '@jest/globals'

describe('isPlainObject', () => {
  it('should return `true` if the object is created by the `Object` constructor.', () => {
    x(isPlainObject(Object.create({}))).toBe(true)
    x(isPlainObject(Object.create(Object.prototype))).toBe(true)
    x(isPlainObject({foo: 'bar'})).toBe(true)
    x(isPlainObject({})).toBe(true)
    x(isPlainObject(Object.create(null))).toBe(true)
  });

  it('should return `false` if the object is not created by the `Object` constructor.', () =>  {
    function Foo() {this.abc = {};};

    x( isPlainObject(/foo/) ).toBe(false)
    x( isPlainObject(function() {}) ).toBe(false)
    x( isPlainObject(1) ).toBe(false)
    x( isPlainObject(['foo', 'bar']) ).toBe(false)
    x( isPlainObject([]) ).toBe(false)
    x( isPlainObject(null) ).toBe(false)
    x( isPlainObject(new Foo) ).toBe(false)
  });

});
