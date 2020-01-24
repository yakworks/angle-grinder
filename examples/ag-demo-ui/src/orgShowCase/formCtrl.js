/* @ngInject */
export default class FormCtrl {
  constructor($scope, $http, pathWithContext, orgSelectOptions) {
    $scope.save = (form, orgShowCase) => orgShowCase.$save();

    $scope.orgSelectOptions = orgSelectOptions();
  }
}


