app = angular.module("angleGrinder.common")

class NotificationDialogCtrl extends BaseCtrl
  @register app, "NotificationDialogCtrl"
  @inject "$scope", "$log", "options"

  initialize: ->
    @expose @$scope, "options", "close"

  close: ->
    @$log.info "Closing notification dialog"


class NotificationDialog
  @$inject = ["$log", "$q"]
  constructor: (@$log, @$q) ->

  open: (options) ->
    options = { message: options } if angular.isString(options)
    options.okLabel ?= "Ok"

    @$log.info "Opening notification dialog, message:", options.message
    defer = @$q.defer()

    swal({
      title: options.message,
      allowEscapeKey: false,
      confirmButtonText: options.okLabel
      }, () ->
        defer.resolve(
          defer: -> defer
        )
    )

    return defer.promise

app.service "NotificationDialogServ", NotificationDialog
