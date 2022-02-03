import { isTruthy, isFalsy, falsyCheck, truthyCheck } from '../is'

describe('isFalsy', () => {

  test('null naan', () => {
    expect(isFalsy(NaN)).toBe(true)
    expect(isFalsy(null)).toBe(true)
    expect(isFalsy(undefined)).toBe(true)
  })

  test('strings', () => {
    expect(isFalsy('')).toBe(true)
    expect(isFalsy('foo')).toBe(false)
    expect(isFalsy('true')).toBe(false)
    expect(isFalsy('false')).toBe(false)
  })

  test('bool', () => {
    expect(isFalsy(true)).toBe(false)
    expect(isFalsy(false)).toBe(true)
  })

  test('numbers', function() {
    expect(isFalsy(-1)).toBe(false)
    expect(isFalsy(0)).toBe(true)
    expect(isFalsy(0.0)).toBe(true)
    expect(isFalsy(1)).toBe(false)
    expect(isFalsy(2)).toBe(false)
  })

  test('empty object or array', function() {
    expect(isFalsy({})).toBe(true)
    expect(isFalsy([])).toBe(true)
    expect(isFalsy({foo:'bar'})).toBe(false)
    expect(isFalsy(['foo'])).toBe(false)
  })

})

describe('isTruthy', () => {

  test('obvious ones , undefined, null naan', () => {
    expect(isTruthy(NaN)).toBe(false)
    expect(isTruthy(null)).toBe(false)
    expect(isTruthy(undefined)).toBe(false)
  })

  test('strings', () => {
    expect(isTruthy('')).toBe(false)
    expect(isTruthy('foo')).toBe(true)
    expect(isTruthy('true')).toBe(true)
    expect(isTruthy('false')).toBe(true)
  })

  test('bool', () => {
    expect(isTruthy(true)).toBe(true)
    expect(isTruthy(false)).toBe(false)
  })

  test('numbers', function() {
    expect(isTruthy(-1)).toBe(true)
    expect(isTruthy(0)).toBe(false)
    expect(isTruthy(0.0)).toBe(false)
    expect(isTruthy(1)).toBe(true)
    expect(isTruthy(2)).toBe(true)
  })

  test('empty object or array', function() {
    expect(isTruthy({})).toBe(false)
    expect(isTruthy([])).toBe(false)
    expect(isTruthy({foo:'bar'})).toBe(true)
    expect(isTruthy(['foo'])).toBe(true)
  })

})

describe('toTruthy', () => {
  test('false string should return false', function() {
    expect(truthyCheck('false')).toBe(false)
    expect(truthyCheck('FaLsE')).toBe(false)
    expect(truthyCheck('true')).toBe(true)
    expect(truthyCheck('')).toBe(false)
    expect(truthyCheck(false)).toBe(false)
    //sanity check
    expect(truthyCheck({})).toBe(false)
    expect(truthyCheck(true)).toBe(true)
    expect(truthyCheck([])).toBe(false)
    expect(truthyCheck(['false'])).toBe(true)

  })
})

describe('falsyCheck', () => {
  test('false string should return true', function() {
    expect(falsyCheck('false')).toBe(true)
    expect(falsyCheck('FaLsE')).toBe(true)
    expect(falsyCheck('true')).toBe(false)
    expect(falsyCheck('')).toBe(true)
    expect(falsyCheck(false)).toBe(true)
    //sanity check
    expect(falsyCheck({})).toBe(true)
    expect(falsyCheck(true)).toBe(false)
    expect(falsyCheck([])).toBe(true)
    expect(falsyCheck(['false'])).toBe(false)

  })
})
