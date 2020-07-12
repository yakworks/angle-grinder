import _ from 'lodash' // uses babel plugin to only use what is referenced

/**
 * Used to assign angular injected items to the class so they
 * static $inject = ['$scope', 'fooService']
 * constructor(...args) {
 *   argsMerge(args)
 * }
 *
 * then the class will have this.$scope and this.fooService, etc...
 *
 * @param {*} clazz
 */
export function argsMerge(clazz, args) {
  const argObj = clazz.constructor.$inject.reduce((obj, item, index) => {
    obj[item] = args[index]
    return obj
  }, {})
  _.defaults(clazz, argObj)
}
