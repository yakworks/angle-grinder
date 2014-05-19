forms = angular.module("angleGrinder.forms")

class ConfirmationDialogCtrl extends BaseCtrl
  @register forms
  @inject "$scope", "$modalInstance", "$log", "message"

  initialize: ->
    @expose @$scope, "message", "close"

  close: (confirmed) ->
    @$log.info "Closing confirmation dialog", confirmed
    @$modalInstance.close(confirmed)

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

      keyboard: false # do not close the dialog with ESC key
      backdrop: "static" # do not close on click outside of the dialog

      resolve:
        message: -> if message? then message else "Are you sure?"

forms.service "confirmationDialog", ConfirmationDialog
