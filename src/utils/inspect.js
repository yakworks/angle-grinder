
export { default as isEmpty } from 'lodash/isEmpty';

export function isString(value) {
  return  (typeof value === 'string' || value instanceof String)
}

export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
export function isPlainObject(o) {
  if (isObject(o) === false) return false;

  // If has modified constructor
  let ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  let prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) return false;

  return true;
}

export * from './truthy'
