import * as _ from './dash' // uses babel plugin to only use what is referenced

/**
 * isNothing , a bit like isEmpty, is useful for things like formatters
 * where you want to check if the value has something to operates on.
 * Also used when 'pruning' an object to remove all keys that are not 'something'
 *
 * The following returns true
 *  - NaN, null and undefined of course return true
 *  - objects, strings and arrays if empty/zero length
 *  - date objects always return true
 *
 */
 export function isNothing(value) {
  return  _.isNaN(value) ||
    _.isNil(value) ||
    (_.isString(value) && _.isEmpty(value)) ||
    (_.isObject(value) && !_.isDate(value) && _.isEmpty(value))
}

/**
 * see isNothing. Returns true if val is something.
 * Basically isTruthy but without the check for true
 */
export function isSomething(val) {
  return !isNothing(val)
}

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
export function isFalsy(value) {
  return value === false || value === 0 || isNothing(value)
}

/**
 * isFalsy but if its a String will also returns false if 'false|False|FALSE'
 */
export function falsyCheck(value) {
  return value === false || value === 0 ||
    (_.isString(value) && value.toLowerCase() === 'false') ||
    isNothing(value)
}

export function isTruthy(value) {
  return !isFalsy(value)
}

/**
 * inverted falsyCheck but if its a String will also returns true if is NOT 'false|False|FALSE'
 */
export function truthyCheck(value){
  return !falsyCheck(value)
}

export default {
  isFalsy, isTruthy, falsyCheck, truthyCheck, isNothing, isSomething
}

