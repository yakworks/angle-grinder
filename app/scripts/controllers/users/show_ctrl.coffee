class ShowCtrl
  @$inject = ["$scope", "$location", "user"]
  constructor: ($scope, $location, user) ->
    $scope.user = user

    $scope.delete = (user) ->
      $scope.deleting = true

      callback = ->
        $scope.deleting = false
        $location.path("/users")

      user.delete success: callback, error: callback

angular.module("angleGrinder")
  .controller("users.ShowCtrl", ShowCtrl)
