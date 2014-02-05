class IndexCtrl

  @$inject = ["$scope", "$templateCache", "$routeParams", "$log"]
  constructor: ($scope, $templateCache, $routeParams, $log) ->

    # remove tab templates from the cache
    _.each ["_first", "_second", "_third", "_slow"], (name) ->
      $templateCache.remove "templates/tabs/#{name}.html"

    $scope.title = "Tabs with lazy loaded templates"

    # return true when a tab with the given name should be activated by default
    $scope.isTabActive = (name) -> $routeParams.tab is name

    $scope.first = title: "The First Tab"
    $scope.second = title: "The Second Tab"
    $scope.third = title: "The Third Tab"

    $scope.item = name: "Foo"
    $scope.save = (form, item) ->
      return if form.$invalid
      $log.debug "[tabs] saving", item

angular.module("exampleApp")
  .controller("tabs.IndexCtrl", IndexCtrl)
