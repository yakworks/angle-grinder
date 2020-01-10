/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var gridz = angular.module('angleGrinder.gridz')

gridz.directive('agNewButton', ['$compile', $compile => ({
  restrict: 'A',

  link(scope, element, attrs) {
    const text = angular.element($compile('<i class="fa fa-plus" uib-tooltip="Create new"></i> ')(scope))
    return element.append(text)
  }
})
])
