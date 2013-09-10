# TODO write specs for this controller
class MassUpdateFormCtrl

  @$inject = ["$scope", "Users", "userIds", "dialog", "usersGrid"]
  constructor: ($scope, Users, userIds, dialog, usersGrid) ->
    $scope.users = allowance: 0

    $scope.save = (users) ->
      promise = Users.massUpdate(ids: userIds, data: users).$promise
      promise.then ->
        usersGrid.reload()
        $scope.closeDialog()

    $scope.closeDialog = ->
      dialog.close()

angular.module("angleGrinder")
  .controller("users.MassUpdateFormCtrl", MassUpdateFormCtrl)
