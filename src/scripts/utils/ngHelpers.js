import angular from 'angular'

export function isAttrTruthy(scope, attr) {
  return (angular.isString(attr) && attr.length === 0) || //empty attribute
          truthy(scope.$eval(attr));
}

export function truthy(val) {
  return angular.isString(val) ? val.length : !!val;
}
