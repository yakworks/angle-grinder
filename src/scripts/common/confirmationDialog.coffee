app = angular.module("angleGrinder.common")

class ConfirmationDialogCtrl extends BaseCtrl
  @register app, 'ConfirmationDialogCtrl'
  @inject "$scope", "$log", "options", "defer"

  close: (confirmed) ->
    @$log.info "[ag] closing confirmation dialog", confirmed
    @defer.resolve(confirmed)


app.service "confirmationDialog", [
  "$log", "$q", ($log, $q) ->

    # Open the confirmation dialog
    # options - it can be a string or object with the messages
    #   if th message is not specified default "Are you sure?" message will be used
    open: (options = {}) ->
      options = { message: options } if angular.isString(options)

      # assign default confirmation message
      options.message ?= "Are you sure?"

      # assign button labels
      options.cancelLabel ?= "Cancel"
      options.okLabel ?= "Ok"

      $log.info "[ag] opening confirmation dialog", options

      defer = $q.defer()

      swal({
          title: options.message,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: options.okLabel,
          cancelButtonText: options.cancelLabel
        }, (isConfirmed) ->
          if isConfirmed
            defer.resolve(
              options: -> options
              defer: -> defer
            )
      )

      return defer.promise
]
