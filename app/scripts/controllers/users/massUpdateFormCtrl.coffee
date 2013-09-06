class MassUpdateFormCtrl

  @$inject = ["$scope", "Users", "dialog", "userIds"]
  constructor: ($scope, Users, dialog, userIds) ->
    $scope.users = allowance: 0

    $scope.save = (users) ->
      promise = Users.massUpdate(ids: userIds, data: users).$promise
      promise.then ->
        # TODO use grid ctrl (backport changes from other branch)
        $("#grid").trigger("reloadGrid")

        $scope.closeDialog()

    $scope.closeDialog = ->
      dialog.close()

angular.module("angleGrinder")
  .controller("users.MassUpdateFormCtrl", MassUpdateFormCtrl)
