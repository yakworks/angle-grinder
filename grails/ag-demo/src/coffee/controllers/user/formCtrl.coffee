class FormCtrl

  @$inject = ["$scope", "$http", "pathWithContext"]
  constructor: ($scope, $http, pathWithContext) ->

    $http.get(pathWithContext("/org/listAll.json")).success (orgs) ->
      $scope.orgs = orgs

angular.module("angleGrinder")
  .controller("user.FormCtrl", FormCtrl)
