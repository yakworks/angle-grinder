class IndexCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->
    $scope.title = "Panels"

angular.module("angleGrinder.examples")
  .controller("panels.IndexCtrl", IndexCtrl)
