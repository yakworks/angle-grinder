class MassUpdateFormCtrl

  @$inject = ["$scope", "Users", "userIds", "$modalInstance", "usersGrid"]
  constructor: ($scope, Users, userIds, $modalInstance, usersGrid) ->
    $scope.users = allowance: 0

    $scope.save = (users) ->
      promise = Users.massUpdate(ids: userIds, data: users).$promise
      promise.then ->
        usersGrid.reload()
        $modalInstance.close()

    $scope.closeDialog = ->
      $modalInstance.close()

angular.module("angleGrinder")
  .controller("users.MassUpdateFormCtrl", MassUpdateFormCtrl)
