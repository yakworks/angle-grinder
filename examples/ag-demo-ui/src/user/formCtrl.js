/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class FormCtrl {
  static initClass() {
  
    this.$inject = ["$scope", "$http", "pathWithContext"];
  }
  constructor($scope, $http, pathWithContext) {
     // Do
    $http.get(pathWithContext("/org/listAll")).success(orgs => $scope.orgs = orgs);
  }
}
FormCtrl.initClass();

angular.module("angleGrinder")
  .controller("user.FormCtrl", FormCtrl);
