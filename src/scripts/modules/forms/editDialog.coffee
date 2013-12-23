forms = angular.module("angleGrinder.forms")

class FormDialogCtrl
  @$inject = ["$scope", "$rootScope", "$log", "$modalInstance", "serverValidationErrorsHandler", "item", "gridCtrl"]
  constructor: ($scope, $rootScope, $log, $modalInstance, serverValidationErrorsHandler, item, gridCtrl) ->
    $scope.item = item
    $scope.createNew = not item.persisted()

    # workaround for problems with modal's scope and forms
    # for more details see http://stackoverflow.com/questions/19312936/angularjs-modal-dialog-form-object-is-undefined-in-controller
    $scope.form = {}

    # Closes the dialog
    $scope.closeEditDialog = ->
      $log.info "Closing the dialog"
      $modalInstance.close($scope.item)

    # If form is valid performs server side update
    $scope.save = (item) ->
      if $scope.form.edit.$invalid
        $log.warn "The form is invalid", $scope.form.edit
        return

      onSuccess = (response) ->
        $log.info "Item has been updated/created", response

        gridCtrl.saveRow(item.id, response)
        $scope.closeEditDialog()

      onError = (response) ->
        $log.error "Something went wront", response
        serverValidationErrorsHandler($scope.form.edit, response, item.resourceName())

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
  @$inject = ["$modal"]
  constructor: (@$modal) ->

  open: (templateUrl, item, gridCtrl = null) ->
    @$modal.open
      backdrop: "static"
      keyboard: false

      templateUrl: templateUrl
      controller: "FormDialogCtrl"

      resolve:
        item: -> item
        gridCtrl: -> gridCtrl

forms.service "editDialog", EditDialog
