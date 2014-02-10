class IndexCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->
    $scope.title = "Panels"

angular.module("exampleApp")
  .controller("panels.IndexCtrl", IndexCtrl)
