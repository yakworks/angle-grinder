/* @ngInject */
export default class ShowCtrl {
  constructor($scope, $location, org) {
    $scope.org = org

    $scope.delete = function(org) {
      const onSuccess = () => $location.path('/')
      return org.delete({ success: onSuccess })
    }
  }
}
