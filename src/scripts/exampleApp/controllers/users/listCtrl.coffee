class ListCtrl

  @$inject = ["$scope", "$window", "usersGrid", "xlsData", "Users", "massUpdateMixin", "singlePageCrudCtrlMixin"]
  constructor: ($scope, $window, usersGrid, xlsData, Users, massUpdateMixin, singlePageCrudCtrlMixin) ->
    $scope.showGrid = true

    # initialize the grid
    $scope.gridOptions = usersGrid()

    $scope.excelExport = ->
      data = xlsData($scope.usersGrid)
      $window.location.href = data

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
