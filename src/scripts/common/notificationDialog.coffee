app = angular.module("angleGrinder.common")

class NotificationDialogCtrl extends BaseCtrl
  @register app, "NotificationDialogCtrl"
  @inject "$scope", "$modalInstance", "$log", "options"

  initialize: ->
    @expose @$scope, "options", "close"

  close: ->
    @$log.info "Closing notification dialog"
    @$modalInstance.close()

app.run ["$templateCache", ($templateCache) ->
  $templateCache.put "templates/dialogs/notification.html", """
    <div class="modal-body">{{options.message}}</div>

    <div class="modal-footer">
      <button class="btn btn-primary" ng-click="close()">{{options.okLabel}}</button>
    </div>
  """
]

class NotificationDialog
  @$inject = ["$uibModal", "$log"]
  constructor: (@$modal, @$log) ->

  open: (options) ->
    options = { message: options } if angular.isString(options)
    options.okLabel ?= "Ok"

    @$log.info "Opening notification dialog, message:", options.message

    @$modal.open
      templateUrl: "templates/dialogs/notification.html"
      controller: "NotificationDialogCtrl"

      keyboard: false # do not close the dialog with ESC key
      backdrop: "static" # do not close on click outside of the dialog

      resolve: options: -> options

app.service "notificationDialog", NotificationDialog
