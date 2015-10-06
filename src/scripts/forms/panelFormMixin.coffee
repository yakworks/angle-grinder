app = angular.module "angleGrinder.forms"

# mixin for forms inside info panels
app.factory "panelFormMixin", [
  "$log", ($log) ->
    ($scope, args = {}) ->
      {formName} = args

      # the form initially is hidden
      $scope.showForm = false

      # toggles form visibility
      $scope.toggle = ->
        $log.debug "[ag] toggle form visibility", $scope
        $scope.showForm = !$scope.showForm

      # Dummy action for updating the record.
      # It should be overridden in the controller.
      $scope.update = (record) ->
        form = $scope[formName]
        return if form.$invalid

        $log.info "updating the form", form, record
        $scope.showForm = false
]
