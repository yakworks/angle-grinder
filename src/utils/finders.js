import { isPlainObject, isString } from './inspect'
import {toString, isMatchWith} from './dash'

/**
 * deep checks if property includes the string or if not string === the searchkey
 *
 * @param {*} obj the object to look into
 * @param {*} searchKey the searchKey
 * @returns true or false
 */
export const hasSomeDeep = (obj, searchKey)  => {
  return Object.keys(obj).some(key => {
    const val = obj[key]
    if (isPlainObject(val)) {
      return hasSomeDeep(val, searchKey)
    } else {
      if (isString(val)) {
        return val.toLowerCase().includes(toString(searchKey).toLowerCase())
      } else {
        return val == searchKey
      }
    }
  })
}

/**
 * hasSomeDeep to filter array
 *
 * @param {*} arr the array to filter
 * @param {*} searchKey the searchKey
 * @returns the filtered array of matches
 */
export const findSomeDeep = (arr, searchKey)  => {
  return arr.filter(obj => hasSomeDeep(obj, searchKey))
}

/**
 * query by example, uses lodash isMatch
 * @param {*} data
 * @param {*} qbe
 */
export function qbe(data, qbe) {
  let filteredItems = data.filter(it => {
    return isMatchWith(it, qbe, (objValue, searchVal) => {
      //overrides so string does an includes instead of equality check
      if (isString(objValue)) {
        return objValue.toLowerCase().includes(toString(searchVal).toLowerCase())
      }
      return undefined // return undefined puts it through the built in lodash match
    })
  })
  return filteredItems
}
