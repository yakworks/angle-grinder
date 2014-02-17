gridz = angular.module "angleGrinder.gridz"

gridz.constant "rootPath", "/"

# Show the grid (or other content) when the current route
# points to the root page of the given section.
gridz.directive "agGridPlaceholder", [
  "$log", "pathWithContext", "rootPath", ($log, pathWithContext, rootPath) ->
    restrict: "E"
    scope: true

    link: (scope, element, attrs) ->
      scope.templateSrc = pathWithContext(attrs.src)

      # initially show the grid
      scope.showGrid = true

      # show / hide the grid on route change
      scope.$on "$routeChangeSuccess", (event, currentRoute) ->
        show = currentRoute.originalPath is rootPath
        scope.showGrid = show

        msg = if show then "show grid" else "hide grid"
        $log.debug "[agGrid]", msg, currentRoute

    template: """
      <ng-include src="templateSrc" ng-show="showGrid"></ng-include>
    """
]
