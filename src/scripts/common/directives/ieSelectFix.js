/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Fixes bug with select(when user clicks on element in dropdown list but it selects above element) on old versions of IE.
var app = angular.module('angleGrinder.common')

app.directive('ieSelectFix', ['$window', $window => ({
  restrict: 'A',

  link(scope, elem, attrs) {
    return elem.bind('change', function(event) {
      if ($window.navigator.userAgent.indexOf('MSIE 9') > 0) {
        return Array.from(elem).map((option) => option.parentNode.insertBefore(option, option))
      }
    })
  }
})
])
