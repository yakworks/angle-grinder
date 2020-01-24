/* @ngInject */
export default class FormCtrl {
  constructor($scope, $http, pathWithContext) {
     // Do
    $http.get(pathWithContext("/org/listAll")).success(orgs => $scope.orgs = orgs);
  }
}
