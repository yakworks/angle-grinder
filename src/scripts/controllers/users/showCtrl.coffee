class ShowCtrl
  @$inject = ["$scope", "$location", "user"]
  constructor: ($scope, $location, user) ->
    $scope.user = user

    $scope.delete = (user) ->
      onSuccess = -> $location.path("/users")
      user.delete success: onSuccess

angular.module("angleGrinder")
  .controller("users.ShowCtrl", ShowCtrl)
