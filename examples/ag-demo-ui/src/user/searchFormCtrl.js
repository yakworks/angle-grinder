/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
/* @ngInject */
class SearchForm {
  constructor($scope) {
    $scope.search = {contact: {type: []}};

    $scope.contactTypeSelectOptions = {
      multiple: true,
      simple_tags: true,
      tags: ["admin", "customer"]
    };
  }
}

angular.module("angleGrinder")
  .controller("user.SearchForm", SearchForm);
