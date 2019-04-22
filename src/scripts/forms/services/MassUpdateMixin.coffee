mixin = angular.module("angleGrinder.forms")

mixin.factory "MassUpdateMixin", [
  "$log", "$parse", "$uibModal", "pathWithContext", "NotificationDialogServ",
  ($log, $parse, $modal, pathWithContext, NotificationDialogServ) ->
    ($scope, args = {}) ->
      {gridName, templateUrl, controller, extraParams, windowClass, backdropClass} = args
      controller ?= "MassUpdateFormCtrl"

      $scope.massUpdate = ->
        grid = $parse(gridName)($scope)
        throw new Error("the grid is not defined") unless grid?

        # ..grab selected row ids
        selectedIds = grid.getSelectedRowIds()
        if selectedIds.length is 0
          NotificationDialogServ.open("Please select at least one row.")
          return

        params =
          templateUrl: pathWithContext(templateUrl)
          controller: controller

          keyboard: false # do not close the dialog with ESC key
          backdrop: "static" # do not close on click outside of the dialog

          resolve:
            selectedIds: -> selectedIds
            grid: -> grid
            extraParams: -> extraParams

        if windowClass?
          params.windowClass = windowClass

        if backdropClass?
          params.backdropClass = backdropClass
        $modal.open params
]

# Decorates the $scope with mass update magic
mixin.factory "massUpdateFormCtrlMixin", [
  "$log", "MassUpdateHandler",
  ($log, MassUpdateHandler) ->

    ($scope, args = {}) ->
      { dialog, Resource, selectedIds, grid, beforeSave } = args

      # Generic method for mass updating selected rows
      $scope.massUpdate = (records) ->
        data = angular.copy(records)
        $log.info "[forms] mass update", data

        # `beforeSave` callback is given
        if angular.isFunction(beforeSave)
          # transform the data
          data = beforeSave(data)

        params = { ids: selectedIds, data: data }
        promise = Resource.massUpdate(params).$promise

        return promise.then (result) ->
          MassUpdateHandler(grid, result)
          grid.clearSelection()
          $scope.closeDialog()

          return result

      # Generic method for closing the mass update dialog
      $scope.closeDialog = ->
        $log.info "[forms] closing the mass update dialog"
        dialog.close()
]
