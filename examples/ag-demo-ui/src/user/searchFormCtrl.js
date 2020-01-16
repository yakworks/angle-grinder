/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class SearchForm {
  static initClass() {
  
    this.$inject = ["$scope"];
  }
  constructor($scope) {
    $scope.search = {contact: {type: []}};

    $scope.contactTypeSelectOptions = {
      multiple: true,
      simple_tags: true,
      tags: ["admin", "customer"]
    };
  }
}
SearchForm.initClass();

angular.module("angleGrinder")
  .controller("user.SearchForm", SearchForm);
