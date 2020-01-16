/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class MassUpdateFormCtrl {
  static initClass() {
  
    this.$inject = ["$scope", "massUpdateFormCtrlMixin", "dialog", "Resource", "selectedIds", "grid"];
  }
  constructor($scope, massUpdateFormCtrlMixin, dialog, Resource, selectedIds, grid) {
    $scope.records = {timeZone: "UTC"};

    massUpdateFormCtrlMixin($scope, {
      dialog,
      Resource,
      selectedIds,
      grid
    }
    );
  }
}
MassUpdateFormCtrl.initClass();

angular.module("angleGrinder")
  .controller("org.MassUpdateFormCtrl", MassUpdateFormCtrl);
