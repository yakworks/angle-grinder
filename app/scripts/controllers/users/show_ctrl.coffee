class ShowCtrl
  @$inject = ["$scope", "$location", "$routeParams", "Users"]
  constructor: ($scope, $location, $routeParams, Users) ->
    onSuccess = (user) -> $scope.user = user
    onError = (error) -> $location.path("/users")
    Users.get { id: $routeParams.id }, onSuccess, onError

angular.module("angleGrinder")
  .controller("users.ShowCtrl", ShowCtrl)
