/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class FormCtrl {
  static initClass() {
  
    this.$inject = ["$scope", "$http", "pathWithContext", "orgSelectOptions"];
  }
  constructor($scope, $http, pathWithContext, orgSelectOptions) {
    $scope.save = (form, orgShowCase) => orgShowCase.$save();

    $scope.orgSelectOptions = orgSelectOptions();
  }
}
FormCtrl.initClass();

angular.module("admin.org")
  .controller("orgShowCase.FormCtrl", FormCtrl);
