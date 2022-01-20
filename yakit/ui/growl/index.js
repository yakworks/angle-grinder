import { Notyf } from 'notyf'
// import 'notyf/notyf.min.css'
// import themeColors from '../../themeColors'

const themeColors = {
  success: 'hsla(85, 77%, 35%, .97)',
  info: '#039BE5',
  warning: '#faae42',
  'warning-dark': '#faae42',
  danger: 'hsla(0, 53%, 58%, 0.95)',
}

const notyf = new Notyf({
  duration: 2000,
  dismissible: true,
  position: { x: 'right', y: 'top' },
  types: [
    {
      type: 'success',
      background: themeColors.success,
    },
    {
      type: 'error',
      background: themeColors.danger,
      duration: 0,
      dismissible: true,
      icon: {
        className: 'fas fa-exclamation-circle fa-lg',
        tagName: 'i',
        color: 'white'
      }
    },
    {
      type: 'warning',
      background: themeColors['warning-dark'],
      // color: 'black',
      duration: 0,
      icon: {
        className: 'fas fa-exclamation-triangle fa-lg',
        tagName: 'i',
        color: 'white'
      }
    },
    {
      type: 'info',
      background: themeColors.info,
      icon: {
        className: 'fas fa-info-circle fa-lg',
        tagName: 'i',
        color: 'white'
      }
    },
  ]
})
class Growl {

  static newInstance() {
    return new Growl()
  }

  types = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
  }

  constructor() {
    this.notyf = notyf
  }

  open(type, message, title, options) {
    // const opts = _.merge(options, this.options.default, this.options[type])
    let msg = message
    if (title) msg = `<div class='notyf-title'>${title}</div><p>${message}</p>`

    return this.notyf.open({ type: type, message: msg })
  }

  // Helper methods for various alerts types
  success(message, title, options = {}) { return this.open(this.types.success, message, title, options) }
  info(message, title, options = {}) { return this.open(this.types.info, message, title, options) }
  error(message, title, options = {}) { return this.open(this.types.error, message, title, options) }
  warn(message, title, options = {}) { return this.open(this.types.warning, message, title, options) }

}
const _instance = Growl.newInstance()

export default _instance
