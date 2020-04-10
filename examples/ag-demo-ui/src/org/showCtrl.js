/* @ngInject */
export default class ShowCtrl {
  constructor($scope, $location, org) {
    console.log('11111111111111111111')
    console.log(org)
    $scope.org = org

    $scope.delete = function(org) {
      const onSuccess = () => $location.path('/')
      return org.delete({ success: onSuccess })
    }
  }
}
