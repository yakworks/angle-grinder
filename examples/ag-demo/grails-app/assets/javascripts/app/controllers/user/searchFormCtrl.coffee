class SearchForm

  @$inject = ["$scope"]
  constructor: ($scope) ->
    $scope.search = contact: type: []

    $scope.contactTypeSelectOptions =
      multiple: true
      simple_tags: true
      tags: ["admin", "customer"]

angular.module("angleGrinder")
  .controller("user.SearchForm", SearchForm)
