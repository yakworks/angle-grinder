mixin = angular.module("angleGrinder.forms")

mixin.factory "dialogCrudCtrlMixin", [
  "$log", "editDialog", "confirmationDialog", "pathWithContext"
  ($log, editDialog, confirmationDialog, pathWithContext) ->
    ($scope, args = {}) ->
      {Resource, gridName, templateUrl} = args

      openEditDialogFor = (resource) ->
        grid = $scope[gridName]
        editDialog.open(pathWithContext(templateUrl), resource, grid)

      # Generic method for invoking an edit dialog for a resource
      # with the given id
      $scope.editItem = (id) ->
        promise = Resource.get(id: id).$promise
        openEditDialogFor promise

      # Generic method from invoking a dialog for
      # creating a new record
      $scope.createItem = ->
        user = new Resource()
        openEditDialogFor user

      # Generic method for deleting a record
      $scope.deleteItem = (id) ->
        confirmationDialog.open().then (confirmed) ->
          return unless confirmed

          onSuccess = (response) ->
            grid = $scope[gridName]
            grid.removeRow(response.id)

          onError = (response) ->
            $log.error "Cannot delete a resource", response

          promise = Resource.delete(id: id).$promise
          promise.then onSuccess, onError
]
