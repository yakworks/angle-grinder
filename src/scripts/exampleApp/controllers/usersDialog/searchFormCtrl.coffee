class SearchFormCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->

    $scope.userTypeSelectOptions =
      multiple: true
      simple_tags: true
      tags: ["admin", "customer"]

angular.module("exampleApp")
  .controller("usersDialog.SearchFormCtrl", SearchFormCtrl)
