import angular from 'angular'

export function isAttrTruthy(scope, attr) {
  console.log('isAttrTruthy attr', attr)
  if (attr !== undefined) return false
  console.log('isAttrTruthy', attr)
  return (angular.isString(attr) && attr.length === 0) || truthy(scope.$eval(attr))
}

export function truthy(val) {
  const truthy = angular.isString(val) ? val.length : !!val
  console.log(`truthy for ${val}`, truthy)
  return truthy // angular.isString(val) ? val.length : !!val
}
