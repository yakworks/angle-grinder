class ShowCtrl

  @$inject = ["$scope", "$location", "org"]
  constructor: ($scope, $location, org) ->
    $scope.org = org

    $scope.delete = (org) ->
      onSuccess = -> $location.path("/")
      org.delete success: onSuccess

angular.module("angleGrinder")
  .controller("org.ShowCtrl", ShowCtrl)
