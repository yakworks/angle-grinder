/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module('angleGrinder.forms')
// Validates text area to have not more then specified number of lines
app.directive('agMaxLines', ['IsFalsyServ', '$parse', (IsFalsyServ, $parse) => ({
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
      const valid = IsFalsyServ(maxLines) || (numLines <= maxLines)
      ngModelCtrl.$setValidity('maxlines', valid)
      if (valid) { return value } else { return undefined }
    }

    ngModelCtrl.$parsers.unshift(validator)
    ngModelCtrl.$formatters.push(validator)

    return scope.$watch(attrs.agMaxLines, () => validator(ngModelCtrl.$viewValue))
  }
})

])
