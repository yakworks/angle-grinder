import angular from 'angular'
import commonModule from '../commonModule'

var app = angular.module(commonModule)

// treat text inputs as numbers without having input type as number
// It will parse the input values using parseFloat so angular controllers can treat the model value as
// numhers without having to convert it to number each time.

app.directive('agNumber', function() {
  const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/ // borrowed from angularjs

  return {
    require: 'ngModel',
    restrict: 'A',
    link(scope, elem, attrs, ctrl) {
      // borrowed logic from angularjs number directive
      ctrl.$parsers.push(function(value) {
        const empty = ctrl.$isEmpty(value)
        if (empty || NUMBER_REGEXP.test(value)) {
          ctrl.$setValidity('number', true)
          if (value === '') {
            return null
          } else if (empty) {
            return value
          } else { return parseFloat(value) }
        } else {
          ctrl.$setValidity('number', false)
          return true
        }
      })

      return ctrl.$formatters.push(function(value) {
        if (ctrl.$isEmpty(value)) { return '' } else { return parseFloat(value).toFixed(attrs.fractionSize || 2) }
      })
    }
  }
})
