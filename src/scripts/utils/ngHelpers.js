import angular from 'angular'

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
