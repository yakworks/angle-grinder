import angular from 'angular'
import grid2Mod from '../module'
// import _ from 'lodash'
// import Log from '@yakit/core/Log'

/**
 * Opens dialog to show,hide and change order of columns
 */

class ColumnConfigCtrl {
  gridColumns = {
    hidden: [],
    visible: []
  }

  /* @ngInject */
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

angular.module(grid2Mod).service('ColumnConfigServ', function($uibModal) {
  'ngInject';
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
      template: require('./colConfigDialog.html')
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
