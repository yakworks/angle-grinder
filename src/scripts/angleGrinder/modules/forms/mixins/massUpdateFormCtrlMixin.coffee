mixin = angular.module("angleGrinder.forms")

# Decorates the $scope with mass update magic
mixin.factory "massUpdateFormCtrlMixin", [
  "$log", "massUpdateHandler",
  ($log, massUpdateHandler) ->

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
          massUpdateHandler(grid, result)
          $scope.closeDialog()

          return result

      # Generic method for closing the mass update dialog
      $scope.closeDialog = ->
        $log.info "[forms] closing the mass update dialog"
        dialog.close()
]
