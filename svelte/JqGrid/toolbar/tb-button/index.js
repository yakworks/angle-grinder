// import Log from '../../../utils/Log'

class Controller {
  isButton = true

  /* @ngInject */
  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    const opts = this.opts
    if (opts.label && !opts.display) {
      opts.display = opts.label
    }
    if (opts.display && !opts.color) {
      opts.color = 'transparent'
    }

    // if it has menu items then its a dropdown not a button
    if (opts.menuItems) {
      this.isButton = false
    }
  }
}
export default () => ({
  restrict: 'E',
  // replace: true,
  require: {
    tbCtrl: '^gridzToolbar'
  },
  template: require('./tbButton.html'),
  bindToController: {
    opts: '<',
    isLoading: '<',
    gridCtrl: '<'
  },
  controller: Controller,
  controllerAs: 'tbBtnCtrl'
})
