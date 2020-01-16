/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class ShowCtrl {
  static initClass() {
  
    this.$inject = ["$scope", "$controller", "$location", "alerts", "org"];
  }
  constructor($scope, $controller, $location, alerts, org) {
    $scope.org = org;

    $scope.orgTypes = ["company", "organisation"];

    // setup the grid pager
    $scope.currentId = org.id;
    $scope.gridPager = $controller("gridPagerCtrlMixin", {
      $scope,
      gridName: "grid.org",
      currentId: "currentId",
      path: "/:id"
    }
    );

    $scope.save = function(form, org) {
      if (form.$invalid) { return; }

      const onSuccess = () => alerts.info("Org address has been updated.");

      const onError = function(response) {
        if (response.status === 422) {
          const {
            errors
          } = response.data;
          return form.$serverErrors = errors.org;
        }
      };

      return org.save({success: onSuccess, error: onError});
    };
  }
}
ShowCtrl.initClass();

angular.module("angleGrinder")
  .controller("tabbedOrg.ShowCtrl", ShowCtrl);
