import angular from 'angular'
import gridzModule from '../gridzModule'
// import _ from 'lodash'
// import Log from 'angle-grinder/src/utils/Log'

/**
 * Opens dialog to show,hide and change order of columns
 */
const gridz = angular.module(gridzModule)

class ColumnConfigCtrl {
  gridColumns = {
    hidden: [],
    visible: []
  }

  constructor($uibModalInstance, gridCtrl) {
    this.$uibModalInstance = $uibModalInstance
    this.gridCtrl = gridCtrl
    this.colModel = gridCtrl.getColModel()
    // Log.debug('ColumnConfigCtrl gridCtrl', gridCtrl)

    this.colModel.forEach((gridColumn, index) => {
      if (!gridCtrl.systemColumns.includes(gridColumn.name)) {
        const element = { originalId: index, label: gridColumn.label, name: gridColumn.name }
        if (gridColumn.hidden) {
          return this.gridColumns.hidden.push(element)
        } else {
          return this.gridColumns.visible.push(element)
        }
      }
    })
  }

  save() {
    this.gridCtrl.configColumns(this.gridColumns)
    return this.$uibModalInstance.close()
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel')
  }
}

gridz.service('ColumnConfigServ', function($uibModal) {
  this.open = (gridCtrl) => {
    // Log.debug("ColumnConfigServ open grid", grid)
    const modalInstance = $uibModal.open({
      controller: ColumnConfigCtrl,
      controllerAs: '$ctrl',
      keyboard: true,
      backdrop: 'static',
      // scope: {grid: scope.$grid},
      resolve: {
        gridCtrl: () => gridCtrl
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
