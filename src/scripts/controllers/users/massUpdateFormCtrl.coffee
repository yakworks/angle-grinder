class MassUpdateFormCtrl

  @$inject = ["$scope", "Users", "dialog", "selectedIds", "grid"]
  constructor: ($scope, Users, dialog, selectedIds, grid) ->
    $scope.users = allowance: 0

    $scope.save = (users) ->
      promise = Users.massUpdate(ids: selectedIds, data: users).$promise
      promise.then ->
        grid.reload()
        dialog.close()

    $scope.closeDialog = ->
      dialog.close()

angular.module("angleGrinder")
  .controller("users.MassUpdateFormCtrl", MassUpdateFormCtrl)
