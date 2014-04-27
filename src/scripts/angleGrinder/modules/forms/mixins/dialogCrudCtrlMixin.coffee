mixin = angular.module("angleGrinder.forms")

mixin.factory "dialogCrudCtrlMixin", [
  "$log", "$parse", "formDialog", "confirmationDialog"
  ($log, $parse, formDialog, confirmationDialog) ->
    ($scope, options = {}) ->
      { Resource, gridName, templateUrl, extraDialogOptions } = options

      # Retrieve a grid controller from the scope
      getGrid = -> $parse(gridName)($scope)

      openEditDialogFor = (item) ->
        dialogOptions = item: item, grid: getGrid()
        formDialog.open(templateUrl, _.extend(dialogOptions, extraDialogOptions))

      # Generic method for invoking an edit dialog for a resource
      # with the given id
      $scope.editItem = (id) ->
        Resource.get id: id, (item) ->
          item = options.beforeEdit(item) if options.beforeEdit?
          openEditDialogFor item

      # Generic method from invoking a dialog for
      # creating a new record
      $scope.createItem = ->
        item = new Resource()
        item = options.beforeCreate(item) if options.beforeCreate?
        openEditDialogFor item

      # Generic method for deleting a record
      $scope.deleteItem = (id) ->
        confirmationDialog.open().then (confirmed) ->
          return unless confirmed

          onSuccess = (response) ->
            getGrid().removeRow(response.id)

          onError = (response) ->
            $log.error "Cannot delete a resource", response

          promise = Resource.delete(id: id).$promise
          promise.then(onSuccess, onError)
]
