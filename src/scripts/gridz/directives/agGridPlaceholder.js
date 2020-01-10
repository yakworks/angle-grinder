/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var gridz = angular.module('angleGrinder.gridz')

gridz.constant('rootPath', '/')

// Show the grid (or other content) when the current route
// points to the root page of the given section.
gridz.directive('agGridPlaceholder', [
  '$log', '$parse', 'pathWithContext', 'rootPath',
  ($log, $parse, pathWithContext, rootPath) => ({
    restrict: 'E',
    scope: true,

    link(scope, element, attrs) {
      scope.templateSrc = pathWithContext(attrs.src)

      // initially do not render the grid
      scope.renderGrid = false

      // ability to force the grid rendering
      if (attrs.forceRenderGrid) {
        scope.renderGrid = $parse(attrs.forceRenderGrid)(scope)
      }

      // initially hide the grid
      scope.showGrid = false

      // show / hide the grid on route change
      return scope.$on('$routeChangeSuccess', function(event, currentRoute) {
        const currentPath = currentRoute.originalPath
        const show = (currentPath === rootPath) || (currentPath === '')

        // render the grid only once
        if (show) { scope.renderGrid = show }

        // show/hide the grid
        scope.showGrid = show

        const msg = show ? 'show grid' : 'hide grid'
        return $log.debug('[agGrid]', msg, currentRoute)
      })
    },

    template: `\
<div ng-if="renderGrid">
  <ng-include src="templateSrc" ng-show="showGrid"></ng-include>
</div>\
`
  })
])
