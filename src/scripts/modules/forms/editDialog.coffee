forms = angular.module("angleGrinder.forms")

class FormDialogCtrl
  @$inject = ["$scope", "$rootScope", "$log", "dialog", "item", "gridCtrl"]
  constructor: ($scope, $rootScope, $log, dialog, item, gridCtrl) ->
    $scope.item = item
    $scope.createNew = not item.persisted()

    # Closes the dialog
    $scope.closeEditDialog = ->
      $log.info "Closing the dialog"
      dialog.close($scope.item)

    # If form is valid performs server side update
    $scope.save = (item) ->
      if $scope.editForm.$invalid
        $log.warn "The form is invalid", $scope.editForm
        return

      onSuccess = (response) ->
        $log.info "Item has been updated/created", response

        gridCtrl.saveRow(item.id, response)
        $scope.closeEditDialog()

      onError = (response) ->
        $log.error "Something went wront", response

        if response.status is 422
          errors = response.data?.errors?[item.resourceName()]
          $scope.editForm.$serverError = errors
          $log.error "Server side validation errors", errors

      item.save success: onSuccess, error: onError

    # Performs server side delete
    $scope.delete = ->
      onSuccess = (response) ->
        $log.info "Item has been deleted", response

        gridCtrl.removeRow(item.id)
        $scope.closeEditDialog()

      onError = (response) ->
        $log.error "Something went wront", response

      item.delete success: onSuccess, error: onError

forms.controller "FormDialogCtrl", FormDialogCtrl

class EditDialog
  @$inject = ["$dialog"]
  constructor: (@$dialog) ->

  open: (templateUrl, item, gridCtrl = null) ->
    dialog = @$dialog.dialog
      backdropFade: false
      dialogFade: false
      resolve:
        item: -> item
        gridCtrl: -> gridCtrl

    # override so we can intercept form dirty and prevent escape
    dialog.handledEscapeKey = (e) ->
      dialog.handleBackDropClick(e) if e.which is 27

    # override so we can intercept form dirty and prevent backdrop click
    dialog.handleBackDropClick = (e) ->
      e.preventDefault()
      unless dialog.$scope.editForm.$dirty
        dialog.close()
        dialog.$scope.$apply()

    dialog.open templateUrl, "FormDialogCtrl"

forms.service "editDialog", EditDialog
