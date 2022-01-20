import angular from 'angular'
import commonModule from '../commonModule'

import { isFalsy } from '@yakit/core/truthy'

var app = angular.module(commonModule)
// Validates text area to have not more then specified number of lines
app.directive('agMaxLines', ['$parse', ($parse) => ({
  require: 'ngModel',
  restrict: 'A',

  link(scope, elem, attrs, ngModelCtrl) {
    const validator = function(value) {
      value = value ? value.trim() : value
      // Takes value of `attrs.agMaxLines` and looks for this name in scope and takes value of this property
      const maxLines = $parse(attrs.agMaxLines)(scope)
      const numLines = (value || '').split('\n').length
      const valid = isFalsy(maxLines) || (numLines <= maxLines)
      ngModelCtrl.$setValidity('maxlines', valid)
      if (valid) { return value } else { return undefined }
    }

    ngModelCtrl.$parsers.unshift(validator)
    ngModelCtrl.$formatters.push(validator)

    return scope.$watch(attrs.agMaxLines, () => validator(ngModelCtrl.$viewValue))
  }
})

])
