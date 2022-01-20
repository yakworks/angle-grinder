import pipe from '../pipe'
import {_defaults, isFunction} from '../dash'

/**
 * @typedef {object} Factory
 * @property {object} of self reference so can be used like Car.of
 */

/**
 * @typedef {object} Mixer
 * @property {object} target the target object that will be merged to.
 * @property {function} ctor the constructor function
 * @property {function(object): object}  factory the piped function of functions
 * @property {function(function): Mixer} it the constructor function
 * @property {function(object): Mixer}   pipe the functions for the pipe
 * @property {function(...any): object}  with the functions for the pipe
 * @property {function(object): object}  extend adds props but does not overwrite
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
 *  mix(target).it(Drone).with(
 *    makeFlyable,
 *    withBattery
 *  )
 *
 *  mix().with(withBattery, Object.freeze)
 *
 *  mix(target).of(Drone).merge(simpleObj, simpleObj)
 *
 * @param {object} target plain object to be used as the base, can be undefined and will default to a new
 * @param sources
 * @returns {Mixer} - the mixer instance
 */
const mixer = ( target = {}, ...sources ) => {

  /** @type Mixer */
  let o = { }

  //defaults to an empty target object
  o.target = target

  /**
   * Fluent interface for setting the constuctor, see example
   * @param {function} constructor factory function, used to pas through to mixConstructor
   * @returns this mixer instance
   */
  o.it = function(constructor) {
    o.ctor = constructor
    // mixConstructor(o.ctor)
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
    if(o.ctor) funcs.push(mixConstructor(o.ctor))
    //pipes the factory functions and returns the final function
    o.factory = pipeObject(...funcs)
    // o.factory = pipe(...funcs)
    return o
    // return pipe(...funcs, mixConstructor(constructor))
  }

  /**
   * Build -> pipe the functions together and call the result with whats in the target
   *
   * @param  {...function} funcs
   * @returns {object} the built object
   */
  o.with = function(...funcs) {
    //combines the functions using a default empty object as starting point
    // @ts-ignore
    return o.pipe(...funcs).factory(o.target)
  }

  /**
   * Build -> if no factory functions are piped and want to merge simple objects.
   * Modifies the target in place as does not copy or clone.
   * Think of it more like a class extends where the supers are whats being extended.
   * If the target has the property of function then it keeps it. if not then its assigns in and will use the supers.
   * shallow assign to the target object for properties that resolve to undefined on target.
   * super source objects are applied from left to right, so the first one is what wins.
   * Once a property is set, additional values of the same property are ignored.
   * Uses the lodash _defaults
   */
  o.extend = function(...supers ) {
    return _defaults(o.target, ...supers)
  }

  return o
}

export const pipeObject = (...fns) => initialObj => {
  return fns.reduce((accumFn, fnOrObj) => {
    if(isFunction(fnOrObj)){
      return fnOrObj(accumFn)
    } else {
      const objAsFunc = (obj) => _defaults(obj, fnOrObj)
      //assume its an object and merge it with _defaults
      return objAsFunc(accumFn)
    }
  }, initialObj);
}

export default mixer
