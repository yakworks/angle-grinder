/* @ngInject */
export default class FormCtrl {
  constructor($location) {
    this.$location = $location
  }

    save = function(form, org) {
      if (form.$invalid) { return }

      const onSuccess = org => this.$location.path(`/fresh/org/${org.id}`)

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
