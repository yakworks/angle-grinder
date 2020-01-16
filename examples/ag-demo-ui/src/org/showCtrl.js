/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class ShowCtrl {
  static initClass() {
  
    this.$inject = ["$scope", "$location", "org"];
  }
  constructor($scope, $location, org) {
    $scope.org = org;

    $scope.delete = function(org) {
      const onSuccess = () => $location.path("/");
      return org.delete({success: onSuccess});
    };
  }
}
ShowCtrl.initClass();

angular.module("angleGrinder")
  .controller("org.ShowCtrl", ShowCtrl);
