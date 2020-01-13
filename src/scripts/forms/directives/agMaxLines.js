import angular from 'angular'
import formsModule from '../formsModule'
import { isFalsy } from '../../utils/isFalsy'

var app = angular.module(formsModule)
// Validates text area to have not more then specified number of lines
app.directive('agMaxLines', ['$parse', ($parse) => ({
  require: 'ngModel',
  restrict: 'A',

  link(scope, elem, attrs, ngModelCtrl) {
    const validator = function(value) {
      value = value ? value.trim() : value
      // XXX explain how this is working, attrs.agMaxLines
      const maxLines = $parse(attrs.agMaxLines)(scope)
      // console.log('$parse(attrs.agMaxLines) **********************************************************' + $parse(attrs.agMaxLines))
      // console.log('scope **********************************************************' + scope)
      // console.log('maxLines **********************************************************' + maxLines)
      // console.log('attrs.agMaxLines **********************************************************' + attrs.agMaxLines)
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
