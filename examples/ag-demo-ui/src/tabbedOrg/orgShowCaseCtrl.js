/* @ngInject */
export default class orgShowCaseCtrl {
  constructor($scope, $controller, $location, alerts, resourceBuilder) {
    const orgShowCase  = resourceBuilder("/orgShowCase", "orgShowCase");

    orgShowCase.get({id: $scope.org.orgShowCaseId}, function(resp) {
      $scope.orgShowCase = resp;
      return $scope.tzShowCase = angular.copy($scope.orgShowCase);
    });

    $scope.save = orgShowCase => orgShowCase.$save();
  }
}


