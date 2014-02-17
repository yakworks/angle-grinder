class ListCtrl

  @$inject = ["$scope", "usersGrid", "Users", "massUpdateMixin", "singlePageCrudCtrlMixin"]
  constructor: ($scope, usersGrid, Users, massUpdateMixin, singlePageCrudCtrlMixin) ->
    $scope.showGrid = true

    # initialize the grid
    $scope.gridOptions = usersGrid()

    singlePageCrudCtrlMixin $scope,
      Resource: Users
      resourcePath: "/users"
      gridName: "usersGrid"

    massUpdateMixin $scope,
      templateUrl: "/templates/users/massUpdateForm.html"
      controller: "users.MassUpdateFormCtrl"
      gridName: "usersGrid"

angular.module("exampleApp")
  .controller("users.ListCtrl", ListCtrl)
