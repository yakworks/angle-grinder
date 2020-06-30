// import Log from '../../../utils/Log'

class Controller {
  isButton = true

  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    const opts = this.opts
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
    gridCtrl: '^agGridz',
    tbCtrl: '^agGridToolbar'
  },
  template: require('./tbButton.html'),
  bindToController: {
    opts: '<'
  },
  controller: Controller,
  controllerAs: 'tbBtnCtrl'
})
