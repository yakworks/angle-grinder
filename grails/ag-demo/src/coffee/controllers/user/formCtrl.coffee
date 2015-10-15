class FormCtrl

  @$inject = ["$scope", "$http", "pathWithContext"]
  constructor: ($scope, $http, pathWithContext) ->
     # Do
    $http.get(pathWithContext("/org/listAll")).success (orgs) ->
      $scope.orgs = orgs

angular.module("angleGrinder")
  .controller("user.FormCtrl", FormCtrl)
