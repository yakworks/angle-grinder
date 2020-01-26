/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

/* @ngInject */
export default class ShowCtrl {
  constructor($scope, $location, org) {
    $scope.org = org;

    $scope.delete = function(org) {
      const onSuccess = () => $location.path("/");
      return org.delete({success: onSuccess});
    };
  }
}
