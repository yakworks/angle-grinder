import angular from 'angular'

export function isAttrTruthy(scope, attr) {
  if (attr === undefined) return false
  return (angular.isString(attr) && attr.length === 0) || truthy(scope.$eval(attr))
}

export function truthy(val) {
  const truthy = angular.isString(val) ? val.length : !!val
  return truthy // angular.isString(val) ? val.length : !!val
}
