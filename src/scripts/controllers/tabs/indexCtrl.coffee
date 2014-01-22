class IndexCtrl

  @$inject = ["$scope", "$templateCache", "$routeParams"]
  constructor: ($scope, $templateCache, $routeParams) ->
    # remove tab templates from the cache
    _.each ["_first", "_second", "_third"], (name) ->
      $templateCache.remove "templates/tabs/#{name}.html"

    $scope.title = "Tabs with lazy loaded templates"

    # return true when a tab with the given name should be activated by default
    $scope.isTabActive = (name) -> $routeParams.tab is name

angular.module("angleGrinder.examples")
  .controller("tabs.IndexCtrl", IndexCtrl)
