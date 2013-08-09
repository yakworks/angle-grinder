class ShowCtrl

  @$inject = ["$scope", "org"]
  constructor: ($scope, org) ->
    $scope.org = org

angular.module("angleGrinder")
  .controller("org.ShowCtrl", ShowCtrl)
