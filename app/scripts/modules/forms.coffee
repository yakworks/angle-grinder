forms = angular.module("angleGrinder.forms", [
  "angleGrinder.common"
  "ui.bootstrap"
  "$strap.directives"
])

forms.value "$strapConfig",
  datepicker:
    language: "en"
    format: "mm/dd/yyyy"
    type: "iso"
    autoClose: true
    forceParse: false

# TODO write specs for this controller
class EditDialogCtrl
  @$inject = ["$scope", "$log", "$modalInstance", "item", "gridCtrl"]
  constructor: ($scope, $log, $modalInstance, item, gridCtrl) ->
    $scope.item = item
    $scope.createNew = not item.persisted()

    # Closes the dialog
    $scope.closeEditDialog = ->
      $log.info "Closing the dialog"
      $modalInstance.dismiss("cancel click")

    # If form is valid performs server side update
    $scope.save = (item) ->
      # TODO $scope.editForm is undefined due to https://github.com/angular-ui/bootstrap/issues/969
      # TODO this is dirty hack: get `editForm` from the form element scope
      form = $scope.editForm or $("form[name=editForm]").scope().editForm

      if form.$invalid
        $log.warn "The form is invalid", form
        return

      onSuccess = (response) ->
        $log.info "Item has been updated/created", response

        gridCtrl.saveRow(item.id, response)
        $modalInstance.close(item)

      onError = (response) ->
        $log.error "Something went wront", response

        if response.status is 422
          errors = response.data?.errors?[item.resourceName()]
          form.$serverError = errors
          $log.error "Server side validation errors", errors

      item.save success: onSuccess, error: onError

    # Performs server side delete
    $scope.delete = ->
      onSuccess = (response) ->
        $log.info "Item has been deleted", response

        gridCtrl.removeRow(item.id)
        $modalInstance.close(item)

      onError = (response) ->
        $log.error "Something went wront", response

      item.delete success: onSuccess, error: onError

forms.controller "EditDialogCtrl", EditDialogCtrl

class EditDialog
  @$inject = ["$modal"]
  constructor: (@$modal) ->

  open: (templateUrl, item, gridCtrl = null) ->
    modalInstance = @$modal.open
      templateUrl: templateUrl
      controller: "EditDialogCtrl"
      backdrop: "static"
      resolve:
        item: -> item
        gridCtrl: -> gridCtrl

    modalInstance

forms.service "editDialog", EditDialog

class ConfirmationDialogCtrl
  @$inject = ["$scope", "$log", "$modalInstance", "message"]
  constructor: ($scope, $log, $modalInstance, message) ->
    $scope.message = message
    $scope.close = (confirmed) ->
      $log.info "Confirmation dialog closed", confirmed
      $modalInstance.close(confirmed)

forms.controller "ConfirmationDialogCtrl", ConfirmationDialogCtrl

forms.run ["$templateCache", ($templateCache) ->
  $templateCache.put "templates/dialogs/confirmation.html", """
    <div class="modal-body">{{message}}</div>
      <div class="modal-footer">
      <button class="btn" ng-click="close(false)">Cancel</button>
      <button class="btn btn-primary" ng-click="close(true)">OK</button>
    </div>
  """
]

class ConfirmationDialog
  @$inject = ["$modal", "$log"]
  constructor: (@$modal, @$log) ->

  open: (message = null) ->
    @$log.info "Opening confirmation dialog, message:", message

    @$modal.open
      templateUrl: "templates/dialogs/confirmation.html"
      controller: "ConfirmationDialogCtrl"
      resolve:
        message: -> if message? then message else "Are you sure?"

forms.service "confirmationDialog", ConfirmationDialog
