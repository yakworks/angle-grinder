import * as _ from './dash' // uses babel plugin to only use what is referenced
import {isNothing} from './something'

/**
 * isFalsy is isNothing with checks for false and 0
 * The following returns true
 *  - NaN, null and undefined of course return true
 *  - empty objects, strings and arrays, length=0
 *
 * date objects always return false
 *
 * @param value any value
 * @returns boolean false or true
 */
export function isFalsy(value): boolean {
  return value === false || value === 0 || isNothing(value)
}

/**
 * isFalsy but if its a String will also returns false if 'false|False|FALSE'
 */
export function falsyCheck(value): boolean {
  return value === false || value === 0 ||
    (_.isString(value) && value.toLowerCase() === 'false') ||
    isNothing(value)
}

export function isTruthy(value: any): boolean  {
  return !isFalsy(value)
}

/**
 * inverted falsyCheck but if its a String will also returns true if is NOT 'false|False|FALSE'
 */
export function truthyCheck(value: any): boolean  {
  return !falsyCheck(value)
}

export default {
  isFalsy, isTruthy, falsyCheck, truthyCheck
}

