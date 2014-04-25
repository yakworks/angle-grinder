forms = angular.module("angleGrinder.forms")

# TODO split it into separate files

# Generic controller for forms inside modal dialogs
class FormDialogCtrl
  @$inject = ["$scope", "$rootScope", "$log", "dialog", "serverValidationErrorsHandler", "item", "grid"]
  constructor: ($scope, $rootScope, $log, dialog, serverValidationErrorsHandler, item, grid) ->
    $scope.item = item
    $scope.createNew = not item.persisted()

    # Closes the dialog
    $scope.closeDialog = ->
      $log.info "[ag] closing the dialog"
      dialog.close($scope.item)

    # If form is valid performs server side update
    $scope.save = (form, item) ->
      return unless form.$valid

      onSuccess = (response) ->
        $log.info "[ag] item has been updated/created", response

        grid.saveRow(response.id, response)
        $scope.closeDialog()

      onError = (response) ->
        $log.error "[ag] something went wront", response
        serverValidationErrorsHandler(form, response, item.resourceName())

      item.save(success: onSuccess, error: onError).$promise

    # Performs server side delete
    $scope.delete = ->
      onSuccess = (response) ->
        $log.info "[ag] item has been deleted", response

        grid.removeRow(item.id)
        $scope.closeDialog()

      onError = (response) ->
        $log.error "[ag] something went wront", response

      item.delete(success: onSuccess, error: onError).$promise

forms.controller("FormDialogCtrl", FormDialogCtrl)

# Opens a modal dialog with embeded generic form for
# create or update an item
forms.factory "formDialog", [
  "$dialog", "pathWithContext",
  ($dialog, pathWithContext) ->

    open: (templateUrl, item, grid) ->
      dialog = $dialog.dialog
        backdropFade: false
        dialogFade: false
        resolve:
          item: -> item
          grid: -> grid

      # override so we can intercept form dirty and prevent escape
      dialog.handledEscapeKey = (e) ->
        dialog.handleBackDropClick(e) if e.which is 27

      # override so we can intercept form dirty and prevent backdrop click
      dialog.handleBackDropClick = (e) ->
        e.preventDefault()

        formCtrl = dialog.form
        if formCtrl? and not formCtrl.$dirty
          dialog.close()
          dialog.$scope.$apply()

      dialog.open(pathWithContext(templateUrl), "FormDialogCtrl")

]
