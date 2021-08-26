// import Log from '../../../utils/Log'
import _ from 'lodash'

const DEFAULT_MENU_DISPLAY = 'Action'

class Controller {
  /* @ngInject */
  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    this.menuDisplay = this.menuDisplay || DEFAULT_MENU_DISPLAY
    this.color = this.color || 'default'
  }

  fireMenuClick(menuItem, event) {
    // if it has an action then fire that
    if (_.isFunction(menuItem.action)) {
      menuItem.action(menuItem, event)
    } else if (_.isFunction(this.menuClick)) { // if there is a default then use it
      this.menuClick(menuItem, event)
    }
  }
}

export default () => ({
  restrict: 'E',
  replace: true,
  controllerAs: 'tbCtrl',
  bindToController: true,
  transclude: true,
  template: require('./toolbar.html'),
  controller: Controller,
  scope: {
    color: '@',
    menuItems: '<',
    menuClick: '='
  }
})
