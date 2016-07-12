forms = angular.module("angleGrinder.forms")

# Opens a modal dialog with embedded generic form for
# create or update record
forms.factory "FormDialogServ", [
  "$uibModal", "pathWithContext",
  ($modal, pathWithContext) ->

    open: (templateUrl, dialogOptions = {}) ->

      scope = dialogOptions.scope if angular.isDefined(dialogOptions.scope)

      $modal.open
        templateUrl: pathWithContext(templateUrl)
        controller: "FormDialogCtrl"
        keyboard: false # do not close the dialog with ESC key
        backdrop: "static" # do not close on click outside of the dialog
        scope: scope

        resolve:
          dialogOptions: -> dialogOptions
]

# Generic controller for forms inside modal dialogs
class FormDialogCtrl extends BaseCtrl

  @register forms, "FormDialogCtrl"
  @inject "$scope", "$rootScope", "$log", "$modalInstance", "dialogOptions"

  initialize: ->
    # Assign dialog options to the scope
    @$scope.dialogOptions = @dialogOptions
    { @record, @grid } = @$scope.dialogOptions

    # assign the given resource to the scope under its name
    resourceName = if angular.isFunction(@record.resourceName) then @record.resourceName() else "record"
    @$scope[resourceName] = @record
    if @$scope.dialogOptions.exposeRecordToScope then @$scope.$parent[resourceName] = @record

    @expose @$scope, "closeDialog", "save", "delete"

  # Closes the dialog
  closeDialog: =>
    @$log.info "[ag] closing the dialog"
    @$modalInstance.close(@record)

  # If form is valid performs server side update
  save: (record) =>
    promise = record.$save()

    promise.then (record) =>
      @$log.info "[ag] record has been updated/created", record

      @grid.saveRow(record.id, record)
      @$scope.closeDialog()

    return [promise, record]

  # Performs server side delete
  delete: =>
    promise = @record.delete()

    promise.then (response) =>
      @$log.info "[ag] record has been deleted", response

      @grid.removeRow(response.id)
      @$scope.closeDialog()

    promise.catch (response) =>
      @$log.error "[ag] something went wrong", response

    return promise
