import pipe from '../pipe'

/**
 * @typedef {object} Factory
 * @property {object} of self reference so can be used like Car.of
 */

/**
 * @typedef {object} Mixer
 * @property {object} target the target object that will be merged to.
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
  // o.__proto__.constructor = constructor
  return o
}

/**
 * mix builder to functionaly compose objects.
 * It expects the functions to be factory functions that accept and object
 *
 * @example
 *  mix(Drone).it(target).with(
 *    makeFlyable,
 *    withBattery
 *  )
 *
 *  mix(target).of(Drone).freeze().with(
 *    makeFlyable,
 *    withBattery
 *  )
 *
 *  mix(target).of(Drone).build()
 *
 * @param {Factory|function} constructor factory function, used to pas through to mixConstructor
 * @returns {Mixer} - the mixer object
 */
const mixer = constructor => {

  /** @type Mixer */
  let o = { }

  //defaults empty target object
  o.target = {}


  /**
   * Fluent interface for setting the target object
   * @param {object} object
   * @returns the mixer instance
   */
  o.it = function(object) {
    o.target = object
    return o
  }

  /**
   * pipe the functions together into the factory property but dont call it
   * 'with' function calls this and also calls the resulting function with the target args
   *
   * @param  {...function} funcs
   * @returns {object} this mixer for fluent calls
   */
  o.pipe = function(...funcs) {

    //pipes the factory functions and returns the final function
    o.factory = pipe(...funcs, mixConstructor(constructor))
    // o.factory = pipe(...funcs)
    return o
    // return pipe(...funcs, mixConstructor(constructor))
  }

  /**
   * pipe the functions together and call the result with whats in the target
   *
   * @param  {...function} funcs
   * @returns {object} the build object
   */
  o.with = function(...funcs) {
    //combines the functions using a default empty object as starting point
    return o.pipe(...funcs).factory(o.target)
  }

  /**
   * Call
   * @returns the Object.freeze(target)
   */
  o.freeze = function() {
    return Object.freeze(o.merge(opts))
  }

  return o
}

export default mixer
