mixin = angular.module("angleGrinder.forms")

mixin.factory "massUpdateFormCtrlMixin", ["$log", ($log) ->
  ($scope, args = {}) ->
    {modalInstance, Resource, selectedIds, grid} = args

    $scope.form = {}

    # Generic method for massupdating selected rows
    $scope.massUpdate = (records) ->
      return if $scope.form.massUpdate.$invalid
      $log.info "Mass updating records", records

      promise = Resource.massUpdate(ids: selectedIds, data: records).$promise

      # result should contain two arrays:
      # result.data - data for successfully updated rows
      # result.errors - assoc array for errors (id => errors)
      promise.then (result) ->
        $log.info "Mass update response", result

        # handle updated fields
        if result.data?
          grid.updateRow(row.id, row) for row in result.data
        else
          $log.warn "Invalid JSON response, missing data array"

        # handle errored fields
        if result.errors?
          grid.flashOnError(id) for id, error of result.errors
        else
          $log.warn "Invalid JSON response, missing errors assoc array"

        $scope.closeDialog()

    # Generic method for closing the mass update dialog
    $scope.closeDialog = ->
      $log.info "Closing the mass update dialog"
      modalInstance.close()

]
