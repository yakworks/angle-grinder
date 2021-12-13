import pipe from './pipe'

/**
 * @typedef {object} Factory
 * @property {object} of self reference so can be used like Car.of
 */

/**
 * @typedef {object} Mixer
 * @property {object} initial
 * @property {function(object): object}  factory
 * @property {function(object): Mixer}   it the initial props
 * @property {function(object): Mixer}   pipe the initial props
 * @property {function(...any): object}  with the initial props
 * @property {function(object): object}  merge the initial props
 * @property {function(object): object}  freeze the initial props
 */


/**
 * Adds the of 'static' method to the constructor function and
 * adds it self to the __proto__ constructor.
 * The returned function expects an object arg that will be merged in to the final
 * object.
 *
 * @param {Factory|function} constructor
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
 * @param {Factory|function} constructor factory function, used to pas through to mixConstructor
 * @returns {Mixer} - the mixer object
 */
const mixer = constructor => {

  /** @type Mixer */
  let o = {}

  o.it = function(object) {
    o.initial = object
    return o
  }

  o.pipe = function(...funcs) {

    //pipes the factory functions and returns the final function
    // o.factory = pipe(...funcs, mixConstructor(constructor))
    o.factory = pipe(...funcs)
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

export default mixer
