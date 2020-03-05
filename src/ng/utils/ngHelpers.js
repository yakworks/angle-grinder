import angular from 'angular'
import _ from 'lodash'
/**
 * checks to see if an attribute it truthy
 *
 * @param {*} scope - scope to use for scope.$eval to eval the value from string
 * @param {*} attr  - the attr to check for truhiness
 */
export function isAttrTruthy(scope, attr) {
  if (attr === undefined) return false
  return (angular.isString(attr) && attr.length === 0) || truthy(scope.$eval(attr))
}

export function truthy(val) {
  const truthy = angular.isString(val) ? val.length : !!val
  return truthy // angular.isString(val) ? val.length : !!val
}

export function expose(thisObj, $scope, ...members) {
  var fmap = _.map(members, (field) => [field, thisObj[field]])
  return _.each(fmap, (...args) => {
    const [field, entity] = Array.from(args[0])
    return $scope[field] = typeof entity === 'function' ? _.bind(entity, thisObj) : entity
  })
}
