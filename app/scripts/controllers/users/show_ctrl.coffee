class ShowCtrl
  @$inject = ["$scope", "$routeParams", "Users"]
  constructor: ($scope, $routeParams, Users) ->
    # TODO redirect when an user cannot be found
    $scope.user = Users.get { id: $routeParams.id }

angular.module("angleGrinder")
  .controller("users.ShowCtrl", ShowCtrl)
