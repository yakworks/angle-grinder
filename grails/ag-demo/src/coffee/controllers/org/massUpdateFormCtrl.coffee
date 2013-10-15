class MassUpdateFormCtrl

  @$inject = ["$scope", "dialog", "Resource", "selectedIds", "grid"]
  constructor: ($scope, dialog, Resource, selectedIds, grid) ->
    $scope.records = timeZone: "UTC"

    $scope.save = (records) ->
      return if $scope.massUpdateForm.$invalid

      promise = Resource.massUpdate(ids: selectedIds, data: records).$promise
      promise.then ->
        grid.reload()
        $scope.closeDialog()

    $scope.closeDialog = ->
      dialog.close()

angular.module("angleGrinder")
  .controller("org.MassUpdateFormCtrl", MassUpdateFormCtrl)
