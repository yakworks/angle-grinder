/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class orgShowCaseCtrl {
  static initClass() {
  
    this.$inject = ["$scope", "$controller", "$location", "alerts", "resourceBuilder"];
  }
  constructor($scope, $controller, $location, alerts, resourceBuilder) {

    const orgShowCase  = resourceBuilder("/orgShowCaseDao", "orgShowCase");

    orgShowCase.get({id: $scope.org.orgShowCaseId}, function(resp) {
      $scope.orgShowCase = resp;
      return $scope.tzShowCase = angular.copy($scope.orgShowCase);
    });

    $scope.save = orgShowCase => orgShowCase.$save();
  }
}
orgShowCaseCtrl.initClass();


angular.module("angleGrinder")
  .controller("tabbedOrg.orgShowCaseCtrl", orgShowCaseCtrl);
