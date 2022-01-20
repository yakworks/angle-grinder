import { isPlainObject, isString } from './is'
import {toString, isMatchWith} from './dash'

/**
 * searches array for id key match
 *
 * @param {{list: array, id: object, ident?: string}} param0 should have data and id, can also pass in idField if identity is other than 'id'
 * @returns {object} the found item in array
 */
export const findIndexById = ({ list, id, ident = 'id'}) => {
  const idx = list.findIndex((item) => item[ident] === id)
  // if (idx === -1) throw Error(`${id} not found`)
  return idx
}

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
