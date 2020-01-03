/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const alerts = angular.module("angleGrinder.alerts", []);

alerts.value("alertTimeout", 3000);

class Alerts {
  constructor($log, $timeout, alertTimeout) {
    this.$log = $log;
    this.$timeout = $timeout;
    this.alertTimeout = alertTimeout;
    this.alertsOptions = {
      error:{},
      info: {},
      success: {},
      defaultOptions: {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "100",
        "hideDuration": "1000",
        "timeOut": this.alertTimeout,
        "extendedTimeOut": 0,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
      }
    };
  }

  wrapMessage(text, type) {
    toastr.options = _.merge(angular.copy(this.alertsOptions.defaultOptions), this.alertsOptions[type]);
    const title = type.charAt(0).toUpperCase() + type.substring(1).toLowerCase();
    return toastr[type](text, title);
  }

  // Helper methods for various alerts types
  success(text) { return this.wrapMessage(text, "success"); }
  info(text) { return this.wrapMessage(text, "info"); }
  error(text) { return this.wrapMessage(text, "error"); }

  setTimeout(delay, type) {
    if (!_.isNil(type)) {
      return this.alertsOptions[type].timeOut = delay;
    } else {
      return this.alertsOptions.defaultOptions.timeOut = delay;
    }
  }

  setErrorTimeout(delay) {
    return this.setTimeout(delay, "error");
  }
}

Alerts.$inject = ["$log", "$timeout", "alertTimeout"];
alerts.service("alerts", Alerts);
