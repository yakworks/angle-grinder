app = angular.module "angleGrinder.gridz"
# Uses to show edit panel for grid row. Supports dbl click on grid cell.
app.directive "gridCrud", ["$controller", ($controller) ->
  {
    restrict: "A"
    replace: true
    scope: true
    template: '<div ng-show="showForm"><ng-include src="template | withContext"></ng-include></div>'
    link: (scope, element, attrs) ->
      clicks = () ->
        gridEl = angular.element(document.querySelectorAll("[ag-grid-name=#{attrs.gridName}]")).find("table.gridz")
        gridEl.jqGrid('setGridParam', ondblClickRow: scope.dblClick)
      attrs.$observe("gridCrud", clicks)

      ctrlLocals =
        $scope: scope
        $element: element
        $attrs: attrs

      controllerName = if attrs.controller then attrs.controller else "GridCrudCtrl"
      $controller(controllerName, ctrlLocals)

      scope.$watch(
        () ->
          scope.showForm or false
        (newVal) ->
          if newVal then scope.setFocus(element)
      )
  }
]
