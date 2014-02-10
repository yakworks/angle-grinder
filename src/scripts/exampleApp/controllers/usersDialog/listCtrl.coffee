class IndexCtrl

  @$inject = ["$scope", "usersDialogGrid", "Users", "dialogCrudCtrlMixin", "massUpdateMixin"]
  constructor: ($scope, usersDialogGrid, Users, dialogCrudCtrlMixin, massUpdateMixin) ->
    # Intitially hide the search form
    $scope.showSearchForm = false

    # initialize the grid
    $scope.gridOptions = usersDialogGrid()

    dialogCrudCtrlMixin $scope,
      Resource: Users
      gridName: "usersGrid"
      templateUrl: "templates/usersDialog/form.html"

    massUpdateMixin $scope,
      templateUrl: "/templates/users/massUpdateForm.html"
      controller: "users.MassUpdateFormCtrl"
      gridName: "usersGrid"

angular.module("exampleApp")
  .controller("usersDialog.ListCtrl", IndexCtrl)
