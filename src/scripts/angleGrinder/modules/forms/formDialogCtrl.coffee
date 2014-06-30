forms = angular.module("angleGrinder.forms")

# Generic controller for forms inside modal dialogs
class FormDialogCtrl extends BaseCtrl

  @register forms, "FormDialogCtrl"
  @inject "$scope", "$rootScope", "$log", "$modalInstance",
    "serverValidationErrorsHandler as validator", "dialogOptions"

  initialize: ->
    # Assign dialog options to the scope
    @$scope.dialogOptions = @dialogOptions
    { @record, @grid } = @$scope.dialogOptions

    # assign the given resource to the scope under its name
    resourceName = if angular.isFunction(@record.resourceName) then @record.resourceName() else "record"
    @$scope[resourceName] = @record

    @expose @$scope, "closeDialog", "save", "delete"

  # Closes the dialog
  closeDialog: =>
    @$log.info "[ag] closing the dialog"
    @$modalInstance.close(@record)

  # If form is valid performs server side update
  save: (form, record) =>
    return unless form.$valid

    promise = record.save().$promise

    promise.then (record) =>
      @$log.info "[ag] record has been updated/created", record

      @grid.saveRow(record.id, record)
      @$scope.closeDialog()

    promise.catch (response) =>
      @$log.error "[ag] something went wrong", response
      @validator(form, response, record.resourceName())

    return promise

  # Performs server side delete
  delete: =>
    promise = @record.delete().$promise

    promise.then (response) =>
      @$log.info "[ag] record has been deleted", response

      @grid.removeRow(response.id)
      @$scope.closeDialog()

    promise.catch (response) =>
      @$log.error "[ag] something went wrong", response

    return promise
