class ShowCtrl
  @$inject = ["$scope", "user"]
  constructor: ($scope, user) ->
    $scope.user = user

angular.module("angleGrinder")
  .controller("users.ShowCtrl", ShowCtrl)
