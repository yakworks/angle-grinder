forms = angular.module("angleGrinder.forms", [
  "angleGrinder.common",
  "ui.bootstrap"
  "ui.date"
])

class FormDialogCtrl
  @$inject = ["$scope", "$rootScope", "$log", "dialog", "item", "flatten"]
  constructor: ($scope, $rootScope, $log, dialog, item, flatten) ->
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

        # Flattening the object before insering it to the grid
        $rootScope.$broadcast "itemUpdated", flatten(response)
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

        $rootScope.$broadcast "itemDeleted", item
        $scope.closeEditDialog()

      onError = (response) ->
        $log.error "Something went wront", response

      item.delete success: onSuccess, error: onError

forms.controller "FormDialogCtrl", FormDialogCtrl

class EditDialog
  @$inject = ["$dialog"]
  constructor: (@$dialog) ->

  open: (templateUrl, item) ->
    dialog = @$dialog.dialog
      backdropFade: false
      dialogFade: false
      resolve:
        item: -> item

    # override so we can intercept form dirty and prevent escape
    dialog.handledEscapeKey = (e) ->
      if e.which is 27
        e.preventDefault()
        unless dialog.$scope.editForm.$dirty
          dialog.close()
          dialog.$scope.$apply()

    # override so we can intercept form dirty and prevent backdrop click
    dialog.handleBackDropClick = (e) ->
      e.preventDefault()
      unless dialog.$scope.editForm.$dirty
        dialog.close()
        dialog.$scope.$apply()

    dialog.open templateUrl, "FormDialogCtrl"

forms.service "editDialog", EditDialog

class ConfirmationDialogCtrl
  @$inject = ["$scope", "$log", "dialog", "message"]
  constructor: ($scope, $log, dialog, message) ->
    $scope.message = message
    $scope.close = (confirmed) ->
      $log.info "Confirmation dialog closed", confirmed
      dialog.close(confirmed)

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
  @$inject = ["$dialog", "$log"]
  constructor: (@$dialog, @$log) ->

  open: (message = null) ->
    @$log.info "Opening confirmation dialog, message:", message

    dialog = @$dialog.dialog
      resolve:
        message: -> if message? then message else "Are you sure?"

    dialog.open "templates/dialogs/confirmation.html", "ConfirmationDialogCtrl"

forms.service "confirmationDialog", ConfirmationDialog
