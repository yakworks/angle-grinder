class ShowCtrl

  @$inject = ["$scope", "$location", "org"]
  constructor: ($scope, $location, org) ->
    $scope.org = org

    $scope.delete = (org) ->
      $scope.deleting = true

      callback = ->
        $scope.deleting = false
        $location.path("/")

      org.delete success: callback, error: callback

angular.module("angleGrinder")
  .controller("org.ShowCtrl", ShowCtrl)
