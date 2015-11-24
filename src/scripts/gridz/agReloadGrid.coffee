gridz = angular.module "angleGrinder.gridz"

# Directive to reload grid - keep scrolling position and selection
gridz.directive "agReloadGrid", [
  ->
    restrict: "E"
    replace: true
    scope:
      grid: "=for"  # assign grid instance

    link: ($scope) ->
      $scope.reload = () ->
        #Save id of the selected row
        selRow = angular.copy($scope.grid.getParam("selrow"))
        selRows = angular.copy($scope.grid.getParam("selarrrow"))
        #Save grid scroll position
        scrollPosition = $scope.grid.getGridEl().closest(".ui-jqgrid-bdiv").scrollTop()

        # Some grids may have selection in gridComplete so to be sure that after reload grid will have the same selection
        # set it after grid complete
        $scope.grid.getGridEl().on "jqGridAfterGridComplete", () ->
          $scope.grid.clearSelection()
          if $scope.grid.getParam("multiselect")
            _.each selRows, (id) ->
              $scope.grid.getGridEl().jqGrid "setSelection", id
          else
            $scope.grid.getGridEl().jqGrid "setSelection", selRow
        # {current: true} - used for keep multi select
        $scope.grid.reload([{current: true}])


    template: """
        <a class="list" ng-click="reload()"><i class="fa fa-refresh"></i></a>
    """
]
