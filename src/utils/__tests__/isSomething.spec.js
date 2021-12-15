/* eslint-disable */
import {isSomething, isNothing} from '../truthy';

describe('isSomething', () => {
  test('null', () => {
    expect(isSomething(null)).toBe(false)
  });

  test('primitives', () => {
    expect(isSomething(1)).toBe(true)
    expect(isSomething(0)).toBe(true)
    expect(isSomething(false)).toBe(true)
    expect(isSomething(true)).toBe(true)
  });

  it('strings', () => {
    expect(isSomething("x")).toBe(true)
    expect(isSomething(" ")).toBe(true)
    expect(isSomething("")).toBe(false)
    expect(isSomething('')).toBe(false)
  });

  it('objects arrays', () => {
    let fooObj = {a:'', b:[], c:{}}
    expect( isSomething(fooObj) ).toBe(true)
    expect( isSomething({}) ).toBe(false)
    expect( isSomething(fooObj.a) ).toBe(false)
    expect( isSomething(fooObj.b) ).toBe(false)
    expect( isSomething(fooObj.c) ).toBe(false)
    expect( isSomething(fooObj.d) ).toBe(false)
  });

});

describe('isNothing', () => {
  test('null', () => {
    expect(isNothing(null)).toBe(true)
  });

  test('primitives', () => {
    expect(isNothing(1)).toBe(false)
    expect(isNothing(0)).toBe(false)
    expect(isNothing(false)).toBe(false)
    expect(isNothing(true)).toBe(false)
  });

  test('strings', () => {
    expect(isNothing("x")).toBe(false)
    expect(isNothing(" ")).toBe(false)
    expect(isNothing("")).toBe(true)
    expect(isNothing('')).toBe(true)
  });

  test('objects arrays', () => {
    let fooObj = {a:'', b:[], c:{}}
    expect( isNothing(fooObj) ).toBe(false)
    expect( isNothing({}) ).toBe(true)
    expect( isNothing(fooObj.a) ).toBe(true)
    expect( isNothing(fooObj.b) ).toBe(true)
    expect( isNothing(fooObj.c) ).toBe(true)
    expect( isNothing(fooObj.d) ).toBe(true)
  });

  test('date', () => {
    let date = new Date(2014, 5, 12)
    expect( (isNothing(date)) ).toBe(false)
  });

});
