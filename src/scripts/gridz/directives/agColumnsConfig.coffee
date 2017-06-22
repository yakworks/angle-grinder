app = angular.module "angleGrinder.gridz"

class ManageGridColumnsCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->

    # Names of columns which are not displayed at the "Manage Columns" modal.
    # These columns are placed at first positions of a grid.
    systemColumns = [
      "cb"
      "-row_action_col"
    ]

    gridEl = $scope.grid.getGridEl()
    colModel = gridEl.jqGrid("getGridParam").colModel
    $scope.gridColumns = {
      "available": []
      "displayed": []
    }

    element = null
    colModel.forEach (gridColumn, index) ->
      if not systemColumns.includes(gridColumn.name)
        element = originalId: index, label: gridColumn.label, name: gridColumn.name
        if gridColumn.hidden
          $scope.gridColumns.available.push element
        else
          $scope.gridColumns.displayed.push element

    $scope.save = () ->
      gridEl = $scope.grid.getGridEl()

      newColumnsOrder = []
      displayedColumns = []
      hiddenColumns = []

      colModel.forEach (column, index) ->
        if systemColumns.includes(column.name)
          newColumnsOrder.push(index)

      $scope.gridColumns.displayed.forEach (column, index) ->
        displayedColumns.push(column.name)
        newColumnsOrder.push(column.originalId)

      $scope.gridColumns.available.forEach (column, index) ->
        hiddenColumns.push(column.name)
        newColumnsOrder.push(column.originalId)

      gridEl.remapColumns(newColumnsOrder, true)
      gridEl.jqGrid("showCol", displayedColumns)
      gridEl.jqGrid("hideCol", hiddenColumns)
      $scope.manageColumnsModal.close()

    $scope.cancel = () ->
      $scope.manageColumnsModal.close()

app.controller("ManageGridColumnsCtrl", ManageGridColumnsCtrl)

app.directive "agManageGridColumns", [
  "$uibModal", "pathWithContext"
  ($uibModal, pathWithContext) ->

    restrict: "E"
    transclude: true
    replace: true
    scope:
      grid: "="

    link: (scope) ->
      scope.renderManageColumnsModal = () ->
        scope.manageColumnsModal = $uibModal.open(
          controller: "ManageGridColumnsCtrl",
          keyboard: true,
          backdrop: "static",
          scope: scope,
          template: """
            <div class="manage-columns-modal">
                <div class="modal-header">
                    <button type="button" class="close" ng-click="cancel()">&times;</button>
                    <h3>Manage Columns</h3>
                </div>

                <div class="modal-body">
                    <div ng-repeat="(listName, list) in gridColumns" class="col-md-6">
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                <h3 class="panel-title">{{listName}} columns</h3>
                            </div>
                            <div class="panel-body simpleDemo">

                                <ul dnd-list="list">
                                    <li ng-repeat="item in list"
                                        dnd-draggable="item"
                                        dnd-moved="list.splice($index, 1)"
                                        dnd-effect-allowed="move">
                                        {{item.label}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">

                    <div class="btn btn-default btn-primary" ng-click="save()">Save</div>

                    <ag-cancel-button ng-click="cancel()"></ag-cancel-button>
                </div>
            </div>
          """
        )

    template: """
      <a ng-click="renderManageColumnsModal()">
        <i class="fa fa-exchange" aria-hidden="true" uib-tooltip='Show, hide or reorder columns'></i>
      </a>
    """
]
