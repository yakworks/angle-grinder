alerts = angular.module("angleGrinder.alerts", [])

alerts.value "alertTimeout", 3000

class Alerts
  @$inject = ["$log", "$timeout", "alertTimeout"]
  constructor: (@$log, @$timeout, @alertTimeout) ->

    @alertsOptions =
      error:{}
      info: {}
      success: {}
      defaultOptions:
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "100",
        "hideDuration": "1000",
        "timeOut": @alertTimeout,
        "extendedTimeOut": 0,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false

  wrapMessage: (text, type) ->
    toastr.options = _.merge angular.copy(@alertsOptions.defaultOptions), @alertsOptions[type]
    title = type.charAt(0).toUpperCase() + type.substring(1).toLowerCase()
    toastr[type](text, title)

  # Helper methods for various alerts types
  success: (text) -> @wrapMessage text, "success"
  info: (text) -> @wrapMessage text, "info"
  error: (text) -> @wrapMessage text, "error"

  setTimeout: (delay, type) ->
    if type?
      @alertsOptions[type].timeOut = delay
    else
      @alertsOptions.defaultOptions.timeOut = delay

  setErrorTimeout: (delay) ->
    @setTimeout(delay, "error")

alerts.service "alerts", Alerts
