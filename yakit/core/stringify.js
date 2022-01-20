import safeStringify from 'fast-safe-stringify'
import { isObject } from './is'

/**
 * see https://github.com/davidmarkclements/fast-safe-stringify
 * stringify if its an object, otherwise return itself
 */
export default function stringify(obj, replacer, spacer, options){
  return isObject(obj) ? safeStringify(obj, replacer, spacer, options) : obj
}
