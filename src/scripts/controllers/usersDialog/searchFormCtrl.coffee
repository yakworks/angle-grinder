class SearchFormCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->

    $scope.userTypeSelectOptions =
      multiple: true
      simple_tags: true
      tags: ["admin", "customer"]

angular.module("angleGrinder.examples")
  .controller("usersDialog.SearchFormCtrl", SearchFormCtrl)
