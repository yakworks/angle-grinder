/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var mixin = angular.module('angleGrinder.forms')

mixin.factory('MassUpdateMixin', [
  '$log', '$parse', '$uibModal', 'pathWithContext', 'NotificationDialogServ',
  ($log, $parse, $modal, pathWithContext, NotificationDialogServ) => function($scope, args) {
    if (args == null) { args = {} }
    let { gridName, templateUrl, controller, extraParams } = args
    if (controller == null) { controller = 'MassUpdateFormCtrl' }

    return $scope.massUpdate = function() {
      const grid = $parse(gridName)($scope)
      if (_.isNil(grid)) { throw new Error('the grid is not defined') }

      // ..grab selected row ids
      const selectedIds = grid.getSelectedRowIds()
      if (selectedIds.length === 0) {
        NotificationDialogServ.open('Please select at least one row.')
        return
      }

      return $modal.open({

        templateUrl: pathWithContext(templateUrl),
        controller,

        keyboard: false, // do not close the dialog with ESC key
        backdrop: 'static', // do not close on click outside of the dialog

        resolve: {
          selectedIds() { return selectedIds },
          grid() { return grid },
          extraParams() { return extraParams }
        }
      })
    }
  }

])

// Decorates the $scope with mass update magic
mixin.factory('massUpdateFormCtrlMixin', [
  '$log', 'MassUpdateHandler',
  ($log, MassUpdateHandler) => function($scope, args) {
    if (args == null) { args = {} }
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

      return promise.then(function(result) {
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
