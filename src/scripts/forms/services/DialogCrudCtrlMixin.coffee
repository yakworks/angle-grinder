mixin = angular.module("angleGrinder.forms")

mixin.factory "DialogCrudCtrlMixin", [
  "$log", "$parse", "FormDialogServ", "ConfirmationDialogServ"
  ($log, $parse, FormDialogServ, ConfirmationDialogServ) ->
    ($scope, options = {}) ->
      { Resource, gridName, templateUrl, extraDialogOptions } = options

      # Retrieve a grid controller from the scope
      getGrid = -> $parse(gridName)($scope)

      openEditDialogFor = (record) ->
        dialogOptions = record: record, grid: getGrid(), scope: $scope
        FormDialogServ.open(templateUrl, _.extend(dialogOptions, extraDialogOptions))

      # Generic method for invoking an edit dialog for a resource
      # with the given id
      $scope.editRecord = (id) ->
        Resource.get { id: id }, (record) ->
          record = options.beforeEdit(record) if options.beforeEdit?
          openEditDialogFor record

      # Generic method from invoking a dialog for
      # creating a new record
      $scope.createRecord = ->
        record = new Resource()
        record = options.beforeCreate(record) if options.beforeCreate?
        openEditDialogFor record

      # Generic method for deleting a record
      $scope.deleteRecord = (id) ->
        ConfirmationDialogServ.open().then (confirmed) ->
          return unless confirmed

          promise = Resource.delete(id: id).$promise

          promise.then (record) ->
            getGrid().removeRow(record.id)

          promise.catch (response) ->
            $log.error "Cannot delete a resource", response

          return promise
]
