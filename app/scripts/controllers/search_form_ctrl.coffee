class SearchFormCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->
    $scope.search = {}

    $scope.advancedSearch = (search) ->
      console.log search

controllers = angular.module("angleGrinder.controllers")
controllers.controller("SearchFormCtrl", SearchFormCtrl)
