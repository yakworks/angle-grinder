/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.forms");

// mixin for forms inside info panels
app.factory("PanelFormMixin", [
  "$log", $log => (function($scope, args) {
  if (args == null) { args = {}; }
  const {formName} = args;

  // the form initially is hidden
  $scope.showForm = false;

  // toggles form visibility
  $scope.toggle = function() {
    $log.debug("[ag] toggle form visibility", $scope);
    return $scope.showForm = !$scope.showForm;
  };

  // Dummy action for updating the record.
  // It should be overridden in the controller.
  return $scope.update = function(record) {
    const form = $scope[formName];
    if (form.$invalid) { return; }

    $log.info("updating the form", form, record);
    return $scope.showForm = false;
  };
})
]);
