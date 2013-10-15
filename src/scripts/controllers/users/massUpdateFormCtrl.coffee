class MassUpdateFormCtrl

  @$inject = ["$scope", "Users", "dialog", "selectedIds", "grid"]
  constructor: ($scope, Users, dialog, selectedIds, grid) ->
    $scope.records = allowance: 0

    $scope.save = (records) ->
      return if $scope.massUpdateForm.$invalid

      promise = Users.massUpdate(ids: selectedIds, data: records).$promise
      promise.then ->
        grid.reload()
        dialog.close()

    $scope.closeDialog = ->
      dialog.close()

angular.module("angleGrinder")
  .controller("users.MassUpdateFormCtrl", MassUpdateFormCtrl)
