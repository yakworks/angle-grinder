import angular from 'angular'
import formsModule from '../formsModule'
import _ from 'lodash'

var mixin = angular.module(formsModule)

mixin.factory('MassUpdateMixin', [
  '$log', '$parse', '$uibModal', 'pathWithContext', 'NotificationDialogServ',
  ($log, $parse, $uibModal, pathWithContext, NotificationDialogServ) => function(context, args = {}) {
    let { gridName, templateUrl, controller, extraParams, template } = args
    if (controller == null) {
      controller = 'MassUpdateFormCtrl'
    }

    return context.massUpdate = function() {
      const grid = $parse(gridName)(context) || $parse(gridName)(context.$scope)
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
        controllerAs: '$ctrl',
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
      console.log(modalOptions)
      return $uibModal.open(modalOptions)
    }
  }

])

// Decorates the $scope with mass update magic
mixin.factory('massUpdateFormCtrlMixin', [
  '$log', 'MassUpdateHandler',
  ($log, MassUpdateHandler) => function(context, args) {
  console.log(context)
    if (args == null) {
      args = {}
    }
    const { dialog, Resource, selectedIds, grid, beforeSave } = args

    // Generic method for mass updating selected rows
    context.massUpdate = function(records) {
      let data = angular.copy(records)
      $log.info('[forms] mass update', data)

      // `beforeSave` callback is given
      if (angular.isFunction(beforeSave)) {
        // transform the data
        data = beforeSave(data)
      }

      const params = { ids: selectedIds, data }
      const promise = Resource.massUpdate(params).$promise
      return promise.then(function(result) {
        MassUpdateHandler(grid, result)
        grid.clearSelection()
        context.closeDialog()

        return result
      })
    }

    // Generic method for closing the mass update dialog
    return context.closeDialog = function() {
      console.log('44444444444444444444444444444444444')
      $log.info('[forms] closing the mass update dialog')
      return dialog.close()
    }
  }
])
