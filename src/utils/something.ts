import _ from 'lodash' // uses babel plugin to only use what is referenced

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
export function isNothing(value): boolean {
  return  _.isNaN(value) ||
    _.isNil(value) ||
    (_.isString(value) && _.isEmpty(value)) ||
    (_.isObject(value) && !_.isDate(value) && _.isEmpty(value))
}

/**
 * see isNothing. Returns true if val is something.
 * Basically isTruthy but without the check for true
 */
export function isSomething(val): boolean {
  return !isNothing(val)
}

export default {
  isNothing, isSomething
}

