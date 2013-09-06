class MassUpdateFormCtrl

  @$inject = ["$scope", "Users", "dialog", "userIds", "usersGrid"]
  constructor: ($scope, Users, dialog, userIds, usersGrid) ->
    $scope.users = allowance: 0

    $scope.save = (users) ->
      promise = Users.massUpdate(ids: userIds, data: users).$promise
      promise.then ->
        usersGrid.reloadGrid()
        $scope.closeDialog()

    $scope.closeDialog = ->
      dialog.close()

angular.module("angleGrinder")
  .controller("users.MassUpdateFormCtrl", MassUpdateFormCtrl)
