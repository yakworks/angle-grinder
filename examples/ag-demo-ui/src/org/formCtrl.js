/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

/* @ngInject */
export default class FormCtrl {
  constructor($scope, $location, org) {
    $scope.org = org;

    $scope.save = function(form, org) {
      if (form.$invalid) { return; }

      const onSuccess = org => $location.path(`/${org.id}`);

      const onError = function(response) {
        if (response.status === 422) {
          const {
            errors
          } = response.data;
          return $scope.editForm.$serverErrors = errors.org;
        }
      };

      return org.save({success: onSuccess, error: onError});
    };
  }
}

