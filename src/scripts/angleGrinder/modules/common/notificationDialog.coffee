app = angular.module("angleGrinder.common")

class NotificationDialogCtrl extends BaseCtrl
  @register app
  @inject "$scope", "$modalInstance", "$log", "message"

  initialize: ->
    @expose @$scope, "message", "close"

  close: ->
    @$log.info "Closing notification dialog"
    @$modalInstance.close()

app.run ["$templateCache", ($templateCache) ->
  $templateCache.put "templates/dialogs/notification.html", """
    <div class="modal-body">{{message}}</div>

    <div class="modal-footer">
      <button class="btn btn-primary" ng-click="close()">OK</button>
    </div>
  """
]

class NotificationDialog
  @$inject = ["$modal", "$log"]
  constructor: (@$modal, @$log) ->

  open: (message) ->
    @$log.info "Opening notification dialog, message:", message

    @$modal.open
      templateUrl: "templates/dialogs/notification.html"
      controller: "NotificationDialogCtrl"

      keyboard: false # do not close the dialog with ESC key
      backdrop: "static" # do not close on click outside of the dialog

      resolve: message: -> message

app.service "notificationDialog", NotificationDialog
