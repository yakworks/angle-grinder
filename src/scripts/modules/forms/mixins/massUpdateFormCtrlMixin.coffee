mixin = angular.module("angleGrinder.forms")

mixin.factory "massUpdateFormCtrlMixin", ["$log", ($log) ->
  ($scope, args = {}) ->
    {dialog, Resource, selectedIds, grid} = args

    # Generic method for massupdating selected rows
    $scope.massUpdate = (records) ->
      return if $scope.massUpdateForm.$invalid
      $log.info "Mass updating records", records

      promise = Resource.massUpdate(ids: selectedIds, data: records).$promise

      # result should contain two arrays:
      # result.updated - data for successfully updated rows
      # result.errored - ids for errored rows
      promise.then (result) ->
        $log.info "Mass update response", result

        # handle updated fields
        grid.updateRow(row.id, row) for row in result.updated

        # handle errored fields
        grid.flashOnError(id) for id in result.errored

        $scope.closeDialog()

    # Generic method for closing the mass update dialog
    $scope.closeDialog = ->
      $log.info "Closing the mass update dialog"
      dialog.close()

]
