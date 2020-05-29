import angular from 'angular'
import formsModule from '../formsModule'
import _ from 'lodash'

var mixin = angular.module(formsModule)

mixin.factory('MassUpdateMixin', [
  '$log', '$parse', '$uibModal', 'pathWithContext', 'NotificationDialogServ',
  ($log, $parse, $uibModal, pathWithContext, NotificationDialogServ) => function($scope, args = {}) {
    let { gridName, templateUrl, controller, extraParams, template } = args
    if (controller == null) {
      controller = 'MassUpdateFormCtrl'
    }

    return $scope.massUpdate = function() {
      const grid = $parse(gridName)($scope)
      if (_.isNil(grid)) {
        throw new Error('the grid is not defined')
      }

      // ..grab selected row ids
      const selectedIds = grid.getSelectedRowIds()
      if (selectedIds.length === 0) {
        NotificationDialogServ.open('Please select at least one row.')
        return
      }
      const modalOptions = {
        controller,
        keyboard: false, // do not close the dialog with ESC key
        backdrop: 'static', // do not close on click outside of the dialog

        resolve: {
          selectedIds() {
            return selectedIds
          },
          grid() {
            return grid
          },
          extraParams() {
            return extraParams
          }
        }
      }
      if (template) {
        modalOptions.template = template
      } else {
        modalOptions.templateUrl = pathWithContext(templateUrl)
      }
      return $uibModal.open(modalOptions)
    }
  }

])

// Decorates the $scope with mass update magic
mixin.factory('massUpdateFormCtrlMixin', [
  '$log', 'MassUpdateHandler',
  ($log, MassUpdateHandler) => function($scope, args) {
    if (args == null) {
      args = {}
    }
    const { dialog, Resource, selectedIds, grid, beforeSave } = args

    // Generic method for mass updating selected rows
    $scope.massUpdate = function(records) {
      let data = angular.copy(records)
      $log.info('[forms] mass update', data)

      // `beforeSave` callback is given
      if (angular.isFunction(beforeSave)) {
        // transform the data
        data = beforeSave(data)
      }

      const params = { ids: selectedIds, data }
      const promise = Resource.massUpdate(params).$promise
      console.log(promise)
      promise.then( result => {
        console.log('sdsdsdsdsdsdsdsdsdzxczxc')
        MassUpdateHandler(grid, result)
        grid.clearSelection()
        $scope.closeDialog()

        return result
      })
    }

    // Generic method for closing the mass update dialog
    return $scope.closeDialog = function() {
      $log.info('[forms] closing the mass update dialog')
      return dialog.close()
    }
  }
])
