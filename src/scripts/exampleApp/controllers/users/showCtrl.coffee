class ShowCtrl

  @$inject = ["$scope", "$location", "exampleGrid", "sampleData", "user"]
  constructor: ($scope, $location, exampleGrid, sampleData, user) ->
    $scope.user = user

    # initialize the grid with generated data
    data = sampleData.generate(100)
    $scope.gridOptions = exampleGrid
      data: data
      shrinkToFit: true
      multiselect: false
      actionPopup: false

    $scope.delete = (user) ->
      onSuccess = -> $location.path("/examples/users")
      user.delete success: onSuccess

angular.module("exampleApp")
  .controller("users.ShowCtrl", ShowCtrl)
