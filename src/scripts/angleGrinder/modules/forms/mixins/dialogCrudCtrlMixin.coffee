mixin = angular.module("angleGrinder.forms")

mixin.factory "dialogCrudCtrlMixin", [
  "$log", "$parse", "formDialog", "confirmationDialog"
  ($log, $parse, formDialog, confirmationDialog) ->
    ($scope, args = {}) ->
      {Resource, gridName, templateUrl} = args

      # Retrieve a grid controller from the scope
      getGrid = -> $parse(gridName)($scope)

      openEditDialogFor = (resource) ->
        formDialog.open(templateUrl, resource, getGrid())

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
        confirmationDialog.open().then (confirmed) ->
          return unless confirmed

          onSuccess = (response) ->
            getGrid().removeRow(response.id)

          onError = (response) ->
            $log.error "Cannot delete a resource", response

          promise = Resource.delete(id: id).$promise
          promise.then onSuccess, onError
]
