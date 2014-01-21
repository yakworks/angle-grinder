class IndexCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->
    $scope.title = "Tabs with lazy loaded templates"

angular.module("angleGrinder.examples")
  .controller("tabs.IndexCtrl", IndexCtrl)
