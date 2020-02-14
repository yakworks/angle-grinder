import _ from 'lodash'
import toastr from 'toastr'

/**
 * a wrapper around toastr with some opinionated defaults
 * see https://github.com/CodeSeven/toastr
 */
class Toast {
  static newInstance() {
    return new Toast()
  }

  // see here for default options https://github.com/CodeSeven/toastr/blob/master/toastr.js#L153
  // options by type, each types overrides will get merged over the defaults
  options = {
    error: {
      // don't auto dismiss on errors
      timeOut: 0,
      extendedTimeOut:0,
      progressBar: false
    },
    info: {},
    success: {},
    warn: {},
    default: {
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
      //onclick: null,
      showDuration: '100',
      extendedTimeOut: 0,
      hideEasing: 'linear',
      tapToDismiss: false,
      // How long the toast will display after a user hovers over it, 0 disables
      extendedTimeOut: 0
    }
  }
  types = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
  }

  static factory() {
    return new Log()
  }

  constructor() {
    this.toastr = toastr
  }

  fire(type, message, title, options) {
    let opts = _.merge(options, this.options.default, this.options[type])
    title = title || this.makeTitle(type)
    return this.toastr[type](message, title, opts)
  }

  // Helper methods for various alerts types
  success(message, title, options = {}) { return this.fire(this.types.success, message, title, options) }
  info(message, title, options = {}) { return this.fire(this.types.success, message, title, options) }
  error(message, title, options = {}) { return this.fire(this.types.success, message, title, options) }
  warn(message, title, options = {}) { return this.fire(this.types.success, message, title, options) }

  makeTitle(type){
    return
  }

  setTimeout(delay, type) {
    if (!_.isNil(type)) {
      return this.options[type].timeOut = delay
    } else {
      return this.options.default.timeOut = delay
    }
  }

  setErrorTimeout(delay) {
    return this.setTimeout(delay, 'error')
  }
}

const _instance = Toast.newInstance()

export default _instance
