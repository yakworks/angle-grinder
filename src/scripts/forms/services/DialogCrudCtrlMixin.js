/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var mixin = angular.module("angleGrinder.forms")

mixin.factory("DialogCrudCtrlMixin", [
  "$log", "$parse", "FormDialogServ", "ConfirmationDialogServ", "alerts",
  ($log, $parse, FormDialogServ, ConfirmationDialogServ, alerts) => (function($scope, options) {
    if (options == null) { options = {} }
    const { Resource, gridName, templateUrl, extraDialogOptions } = options

    // Retrieve a grid controller from the scope
    const getGrid = () => $parse(gridName)($scope)

    const openEditDialogFor = function(record) {
      const dialogOptions = {record, grid: getGrid(), scope: $scope}
      return FormDialogServ.open(templateUrl, _.extend(dialogOptions, extraDialogOptions))
    }

    // Generic method for invoking an edit dialog for a resource
    // with the given id
    $scope.editRecord = id => Resource.get({ id }, function(record) {
      if (!_.isNil(options.beforeEdit)) { record = options.beforeEdit(record) }
      return openEditDialogFor(record)
    })

    // Generic method from invoking a dialog for
    // creating a new record
    $scope.createRecord = function() {
      let record = new Resource()
      if (!_.isNil(options.beforeCreate)) { record = options.beforeCreate(record) }
      return openEditDialogFor(record)
    }

    // Generic method for deleting a record
    return $scope.deleteRecord = id => ConfirmationDialogServ.open().then(function(confirmed) {
      if (!confirmed) { return }

      const promise = Resource.delete({id}).$promise

      promise.then(function(record) {
        $log.debug(`Record deleted ${record.id}`)
        return getGrid().removeRow(record.id)
      })

      promise.catch(function(response) {
        alerts.error(response.data.message)
        return $log.error("Cannot delete a resource", response)
      })

      return promise
    })
  })
])
