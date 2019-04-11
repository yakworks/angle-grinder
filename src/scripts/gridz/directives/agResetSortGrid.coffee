gridz = angular.module "angleGrinder.gridz"

gridz.directive "agResetSortGrid", [
  ->
    restrict: "E"
    replace: true
    scope:
      grid: "=for"

    link: ($scope, element, attrs) ->

      $scope.resetSort = () ->
        columnName = if attrs.defaultColumn then attrs.defaultColumn else "id"
        order = if attrs.defaultOrder then attrs.defaultOrder else "asc"

        colModel = $scope.grid.getGridEl().getGridParam("colModel")
        angular.forEach colModel, (column) ->
          column.lso = if column.name is columnName or column.name is 'id' then order else ''

        angular.element("[ag-grid-name='#{attrs.for}']").find('span.s-ico').hide()
        $scope.grid.getGridEl().setGridParam({sortname: columnName, order: order}).trigger('reloadGrid')

        column = angular.element("[id$='_#{columnName}']")
        column.find("span.s-ico").show()

        disabledClassName = "ui-state-disabled"
        if order is "asc"
          column.find(".ui-icon-asc").removeClass(disabledClassName)
          column.find(".ui-icon-desc").addClass(disabledClassName)
        else
          column.find(".ui-icon-asc").addClass(disabledClassName)
          column.find(".ui-icon-desc").removeClass(disabledClassName)

        return

    template: """
        <a class="list" uib-tooltip="Reset Sorting" ng-click="resetSort()"><i class="fa fa-sort"></i></a>
    """
]

