class orgShowCaseCtrl

  @$inject = ["$scope", "$controller", "$location", "alerts", "resourceBuilder"]
  constructor: ($scope, $controller, $location, alerts, resourceBuilder) ->

    orgShowCase  = resourceBuilder("/orgShowCaseDao", "orgShowCase")

    orgShowCase.get(id: $scope.org.orgShowCaseId, (resp) ->
      $scope.orgShowCase = resp
      $scope.tzShowCase = angular.copy($scope.orgShowCase)
    )

    $scope.save = (orgShowCase)->
      orgShowCase.$save()


angular.module("angleGrinder")
  .controller("tabbedOrg.orgShowCaseCtrl", orgShowCaseCtrl)
