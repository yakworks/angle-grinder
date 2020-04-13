/* @ngInject */
export default class FormCtrl {
  constructor($scope, $location, org) {
    console.log(org)
    console.log($scope)
    $scope.org = org

    $scope.save = function(form, org) {
      if (form.$invalid) { return }

      const onSuccess = org => $location.path(`/${org.id}`)

      const onError = function(response) {
        if (response.status === 422) {
          const {
            errors
          } = response.data
          return $scope.editForm.$serverErrors = errors.org
        }
      }

      return org.save({ success: onSuccess, error: onError })
    }
  }
}
