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
        Resource.get id: id, (resource) ->
          resource = args.beforeEdit(resource) if args.beforeEdit?
          openEditDialogFor resource

      # Generic method from invoking a dialog for
      # creating a new record
      $scope.createItem = ->
        resource = new Resource()
        resource = args.beforeCreate(resource) if args.beforeCreate?
        openEditDialogFor resource

      # Generic method for deleting a record
      $scope.deleteItem = (id) ->
        modalInstance = confirmationDialog.open()
        modalInstance.result.then (confirmed) ->
          return unless confirmed

          onSuccess = (response) ->
            grid = $scope[gridName]
            grid.removeRow(response.id)

          onError = (response) ->
            $log.error "Cannot delete a resource", response

          promise = Resource.delete(id: id).$promise
          promise.then onSuccess, onError
]
