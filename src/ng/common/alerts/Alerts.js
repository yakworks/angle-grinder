import _ from 'lodash'
window.toastr = require('toastr')

export default class Alerts {
  constructor(alertTimeout) {
    // this.$timeout = $timeout
    this.alertTimeout = alertTimeout
    this.alertsOptions = {
      error: {},
      info: {},
      success: {},
      defaultOptions: {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        onclick: null,
        showDuration: '100',
        hideDuration: '1000',
        timeOut: this.alertTimeout,
        extendedTimeOut: 0,
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
        tapToDismiss: false
      }
    }
  }

  wrapMessage(text, type) {
    // toastr.options = _.merge(angular.copy(this.alertsOptions.defaultOptions), this.alertsOptions[type])
    window.toastr.options = _.merge({}, this.alertsOptions.defaultOptions, this.alertsOptions[type])
    const title = type.charAt(0).toUpperCase() + type.substring(1).toLowerCase()
    return window.toastr[type](text, title)
  }

  // Helper methods for various alerts types
  success(text) { return this.wrapMessage(text, 'success') }
  info(text) { return this.wrapMessage(text, 'info') }
  error(text) { return this.wrapMessage(text, 'error') }

  setTimeout(delay, type) {
    if (!_.isNil(type)) {
      return this.alertsOptions[type].timeOut = delay
    } else {
      return this.alertsOptions.defaultOptions.timeOut = delay
    }
  }

  setErrorTimeout(delay) {
    return this.setTimeout(delay, 'error')
  }
}

Alerts.$inject = ['alertTimeout']
