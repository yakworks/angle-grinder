/* @ngInject */
export default class FormCtrl {
  constructor($scope, $http, orgSelectOptions) {
    $scope.orgSelectOptions = orgSelectOptions()
  }
}
