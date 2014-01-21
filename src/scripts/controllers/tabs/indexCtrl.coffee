class IndexCtrl

  @$inject = ["$scope", "$templateCache"]
  constructor: ($scope, $templateCache) ->
    # remove tab templates from the cache
    _.each ["_first", "_second", "_third"], (name) ->
      $templateCache.remove "templates/tabs/#{name}.html"

    $scope.title = "Tabs with lazy loaded templates"

angular.module("angleGrinder.examples")
  .controller("tabs.IndexCtrl", IndexCtrl)
