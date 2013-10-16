mixin = angular.module("angleGrinder.forms")

mixin.factory "massUpdateFormCtrlMixin", ["$log", ($log) ->
  ($scope, args = {}) ->
    {dialog, Resource, selectedIds, grid} = args

    # Generic method for massupdating selected rows
    $scope.massUpdate = (records) ->
      return if $scope.massUpdateForm.$invalid
      $log.info "Mass updating records", records

      promise = Resource.massUpdate(ids: selectedIds, data: records).$promise
      promise.then ->
        grid.reload()
        $scope.closeDialog()

    # Generic method for closing the mass update dialog
    $scope.closeDialog = ->
      $log.info "Closing the mass update dialog"
      dialog.close()

]
