class ListCtrl

  @$inject = ["$scope", "$window", "usersGrid", "Users", "massUpdateMixin", "singlePageCrudCtrlMixin"]
  constructor: ($scope, $window, usersGrid, Users, massUpdateMixin, singlePageCrudCtrlMixin) ->
    $scope.showGrid = true

    # initialize the grid
    $scope.gridOptions = usersGrid()

    $scope.excelExport = ->
      dataUri = $scope.usersGrid.getXlsDataUri()
      $window.location.href = dataUri

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
