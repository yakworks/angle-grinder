import angular from 'angular'
import gridzModule from '../gridzModule'
// import _ from 'lodash'
// import Log from 'angle-grinder/src/utils/Log'

const gridz = angular.module(gridzModule)

class ColumnConfigCtrl {
  // Names of columns which are not displayed at the "Manage Columns" modal.
  // These columns are placed at first positions of a grid.
  systemColumns = ['cb', '-row_action_col']

  constructor($uibModalInstance, gridCtrl) {
    this.$uibModalInstance = $uibModalInstance
    this.gridCtrl = gridCtrl

    // let gridEl = gridCtrl.getGridEl()
    this.colModel = gridCtrl.getParam('colModel')

    this.gridColumns = {
      available: [],
      displayed: []
    }
    const self = this
    let element = null
    this.colModel.forEach(function(gridColumn, index) {
      if (!self.systemColumns.includes(gridColumn.name)) {
        element = { originalId: index, label: gridColumn.label, name: gridColumn.name }
        if (gridColumn.hidden) {
          return self.gridColumns.available.push(element)
        } else {
          return self.gridColumns.displayed.push(element)
        }
      }
    })
  }

  save() {
    const gridEl = this.gridCtrl.getGridEl()

    const newColumnsOrder = []
    const displayedColumns = []
    const hiddenColumns = []
    const self = this
    this.colModel.forEach(function(column, index) {
      if (self.systemColumns.includes(column.name)) {
        return newColumnsOrder.push(index)
      }
    })

    this.gridColumns.displayed.forEach(function(column, index) {
      displayedColumns.push(column.name)
      return newColumnsOrder.push(column.originalId)
    })

    this.gridColumns.available.forEach(function(column, index) {
      hiddenColumns.push(column.name)
      return newColumnsOrder.push(column.originalId)
    })

    gridEl.remapColumns(newColumnsOrder, true)
    gridEl.jqGrid('showCol', displayedColumns)
    gridEl.jqGrid('hideCol', hiddenColumns)
    return this.$uibModalInstance.close()
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel')
  }
}

gridz.service('ColumnConfigServ', function($uibModal) {
  this.open = (grid) => {
    // Log.debug("ColumnConfigServ open grid", grid)
    const modalInstance = $uibModal.open({
      controller: ColumnConfigCtrl,
      controllerAs: '$ctrl',
      keyboard: true,
      backdrop: 'static',
      // scope: {grid: scope.$grid},
      resolve: {
        gridCtrl: function() {
          return grid
        }
      },
      template: modalTemp
    })
    // prevents the "Possibly unhandled rejection: cancel"
    modalInstance.result.catch(function() { modalInstance.close() })
    // modalInstance.result.then(function (selectedItem) {
    //   Log.debug('selectedItem', selectedItem);
    // }, function () {
    //   Log.debug('modal-component dismissed at: ' + new Date());
    // });
  }
})

const modalTemp = `\
<div class="manage-columns-modal">
<div class="modal-header">
  <button type="button" class="close" ng-click="$ctrl.cancel()">&times;</button>
  <h3>Manage Columns</h3>
</div>

<div class="modal-body">
    <div ng-repeat="(listName, list) in $ctrl.gridColumns" class="col-md-6">
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
    <div class="btn btn-default btn-primary" ng-click="$ctrl.save()"><i class="fa fa-check fa-inverse"></i> Save</div>
    <ag-cancel-button ng-click="$ctrl.cancel()"></ag-cancel-button>
</div>
</div>\
`
