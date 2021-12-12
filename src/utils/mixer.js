import pipe from './pipe'

/**
 * Adds the of 'static' method to the constructor function and
 * adds it self to the __proto__ constructor.
 * The returned function expects an object arg that will be merged in to the final
 * object.
 *
 * @param {Function} constructor
 * @returns
 */
 export const mixConstructor = constructor => o => {
  constructor.of = constructor
  o.__proto__.constructor = constructor
  return o
}

/**
 * mix builder to functionaly compose objects.
 * It expects the functions to be factory functions that accept and object
 *
 * @param {function} the constructor factory functions
 * @returns {mix} - the mixer object
 */
export const mix = constructor => {

  let o = {}
  let initial = {}

  o.it = function(object) {
    o.initial = object
    return o
  }

  o.pipe = function(...funcs) {
    //pipes the factory functions and returns the final function
    o.factory = pipe(...funcs, mixConstructor(constructor))
    return o
    // return pipe(...funcs, mixConstructor(constructor))
  }

  o.with = function(...funcs) {
    //combines the functions using a default empty object as starting point
    return o.pipe(...funcs).factory(o.initial)
  }

  o.merge = function(opts = {}) {
    return o.factory(opts)
  }

  o.freeze = function(opts = {}) {
    return Object.freeze(o.merge(opts))
  }

  return o
}

export default mix
