forms = angular.module("angleGrinder.forms")

# Generic controller for forms inside modal dialogs
class FormDialogCtrl extends BaseCtrl

  @register forms, "FormDialogCtrl"
  @inject "$scope", "$rootScope", "$log", "$modalInstance",
    "serverValidationErrorsHandler as validator", "dialogOptions"

  initialize: ->
    # Assign dialog options to the scope
    @$scope.dialogOptions = @dialogOptions
    { item, grid } = @$scope.dialogOptions

    @$scope.item = item
    @$scope.createNew = not item.persisted()

    # Closes the dialog
    @$scope.closeDialog = =>
      @$log.info "[ag] closing the dialog"
      @$modalInstance.close(@$scope.item)

    # If form is valid performs server side update
    @$scope.save = (form, item) =>
      return unless form.$valid

      onSuccess = (response) =>
        @$log.info "[ag] item has been updated/created", response

        grid.saveRow(response.id, response)
        @$scope.closeDialog()

      onError = (response) =>
        @$log.error "[ag] something went wrong", response
        @validator(form, response, item.resourceName())

      item.save(success: onSuccess, error: onError).$promise

    # Performs server side delete
    @$scope.delete = =>
      onSuccess = (response) =>
        @$log.info "[ag] item has been deleted", response

        grid.removeRow(item.id)
        @$scope.closeDialog()

      onError = (response) =>
        @$log.error "[ag] something went wrong", response

      item.delete(success: onSuccess, error: onError).$promise
