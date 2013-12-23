forms = angular.module("angleGrinder.forms")

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

  open: (message = "Are you sure?") ->
    @$log.info "Opening confirmation dialog, message:", message

    @$modal.open
      backdrop: true
      keyboard: true

      templateUrl: "templates/dialogs/confirmation.html"
      controller: "ConfirmationDialogCtrl"

      resolve: message: -> message

forms.service "confirmationDialog", ConfirmationDialog
