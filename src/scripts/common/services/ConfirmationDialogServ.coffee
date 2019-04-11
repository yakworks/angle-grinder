app = angular.module("angleGrinder.common")

app.service "ConfirmationDialogServ", [
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
      options.closeOnConfirm ?= true

      $log.info "[ag] opening confirmation dialog", options

      defer = $q.defer()

      swal({
          title: options.message,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: options.okLabel,
          cancelButtonText: options.cancelLabel
          closeOnConfirm: options.closeOnConfirm
        }, (isConfirmed) -> defer.resolve isConfirmed
      )

      return defer.promise
]
