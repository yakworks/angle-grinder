class SearchFormCtrl

  @$inject = ["$scope", "$rootScope"]
  constructor: ($scope, $rootScope) ->
    $scope.search = {}

    $scope.advancedSearch = (search) ->
      $rootScope.$broadcast("searchUpdated", search, $scope)

angular.module("angleGrinder")
  .controller("SearchFormCtrl", SearchFormCtrl)
