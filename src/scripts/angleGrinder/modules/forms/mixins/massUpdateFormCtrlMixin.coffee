mixin = angular.module("angleGrinder.forms")

mixin.factory "massUpdateFormCtrlMixin", [
  "$log", "massUpdateHandler",
  ($log, massUpdateHandler) ->
    ($scope, args = {}) ->
      {dialog, Resource, selectedIds, grid} = args

      # Generic method for massupdating selected rows
      $scope.massUpdate = (form, records) ->
        return if form.$invalid
        $log.info "Mass updating records", records

        promise = Resource.massUpdate(ids: selectedIds, data: records).$promise
        promise.then (result) ->
          massUpdateHandler(grid, result)
          $scope.closeDialog()

      # Generic method for closing the mass update dialog
      $scope.closeDialog = ->
        $log.info "Closing the mass update dialog"
        dialog.close()
]
