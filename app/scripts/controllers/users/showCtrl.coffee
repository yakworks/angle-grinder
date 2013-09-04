class ShowCtrl
  @$inject = ["$scope", "$location", "user"]
  constructor: ($scope, $location, user) ->
    $scope.user = user

    $scope.deletePromise = $scope.user
    $scope.delete = (user) ->
      onSuccess = -> $location.path("/users")
      $scope.deletePromise = user.$delete(onSuccess)

angular.module("angleGrinder")
  .controller("users.ShowCtrl", ShowCtrl)
