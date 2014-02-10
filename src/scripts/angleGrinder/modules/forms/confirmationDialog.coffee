forms = angular.module("angleGrinder.forms")

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
