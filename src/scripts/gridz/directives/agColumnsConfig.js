/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.gridz")

class ManageGridColumnsCtrl {
  static initClass() {
  
    this.$inject = ["$scope"]
  }
  constructor($scope) {

    // Names of columns which are not displayed at the "Manage Columns" modal.
    // These columns are placed at first positions of a grid.
    const systemColumns = [
      "cb",
      "-row_action_col"
    ]

    let gridEl = $scope.grid.getGridEl()
    const {
      colModel
    } = gridEl.jqGrid("getGridParam")
    $scope.gridColumns = {
      "available": [],
      "displayed": []
    }

    let element = null
    colModel.forEach(function(gridColumn, index) {
      if (!systemColumns.includes(gridColumn.name)) {
        element = {originalId: index, label: gridColumn.label, name: gridColumn.name}
        if (gridColumn.hidden) {
          return $scope.gridColumns.available.push(element)
        } else {
          return $scope.gridColumns.displayed.push(element)
        }
      }
    })

    $scope.save = function() {
      gridEl = $scope.grid.getGridEl()

      const newColumnsOrder = []
      const displayedColumns = []
      const hiddenColumns = []

      colModel.forEach(function(column, index) {
        if (systemColumns.includes(column.name)) {
          return newColumnsOrder.push(index)
        }
      })

      $scope.gridColumns.displayed.forEach(function(column, index) {
        displayedColumns.push(column.name)
        return newColumnsOrder.push(column.originalId)
      })

      $scope.gridColumns.available.forEach(function(column, index) {
        hiddenColumns.push(column.name)
        return newColumnsOrder.push(column.originalId)
      })

      gridEl.remapColumns(newColumnsOrder, true)
      gridEl.jqGrid("showCol", displayedColumns)
      gridEl.jqGrid("hideCol", hiddenColumns)
      return $scope.manageColumnsModal.close()
    }

    $scope.cancel = () => $scope.manageColumnsModal.close()
  }
}
ManageGridColumnsCtrl.initClass()

app.controller("ManageGridColumnsCtrl", ManageGridColumnsCtrl)

app.directive("agManageGridColumns", [
  "$uibModal", "pathWithContext",
  ($uibModal, pathWithContext) => ({
    restrict: "E",
    transclude: true,
    replace: true,

    scope: {
      grid: "="
    },

    link(scope) {
      return scope.renderManageColumnsModal = () => scope.manageColumnsModal = $uibModal.open({
        controller: "ManageGridColumnsCtrl",
        keyboard: true,
        backdrop: "static",
        scope,
        template: `\
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
      <ag-cancel-button ng-click="cancel()"></ag-cancel-button>
      <div class="btn btn-default btn-primary" ng-click="save()"><i class="fa fa-check fa-inverse"></i> Save</div>
  </div>
</div>\
`
      })
    },

    template: `\
<a ng-click="renderManageColumnsModal()">
  <i class="fa fa-exchange" aria-hidden="true" uib-tooltip='Show, hide or reorder columns'></i>
</a>\
`
  })
])
