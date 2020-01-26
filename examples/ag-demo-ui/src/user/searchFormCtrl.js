/* @ngInject */
export default class SearchForm {
  constructor($scope) {
    $scope.search = {contact: {type: []}};

    $scope.contactTypeSelectOptions = {
      multiple: true,
      simple_tags: true,
      tags: ["admin", "customer"]
    };
  }
}
