/* @ngInject */
class FormCtrl {
  constructor($scope, $http, pathWithContext) {
     // Do
    $http.get(pathWithContext("/org/listAll")).success(orgs => $scope.orgs = orgs);
  }
}

angular.module("angleGrinder")
  .controller("user.FormCtrl", FormCtrl);
