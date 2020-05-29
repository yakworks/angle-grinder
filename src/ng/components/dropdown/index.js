// import Log from '../../../utils/Log'
import _ from 'lodash'

const DEFAULT_MENU_DISPLAY = 'Action'

class Controller {
  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    this.menuDisplay = this.menuDisplay || DEFAULT_MENU_DISPLAY
    this.color = this.color || 'default'
    this.bCls = this.buttonClass || ''
    // if its icon then its an an icon button with no border, set is-icon-button
    if (!this.icon) {
      this.bCls = `${this.bCls} dropdown-toggle`
    }
    // this.bCls = "foo"
    // console.log("this.btnCls" , this.bCls )
  }

  fireMenuClick(menuItem, event) {
    // if it has an action then fire that
    if (_.isFunction(menuItem.action)) {
      menuItem.action(menuItem, event)
    } else if (_.isFunction(this.menuClick)) { // if there is a default then use it
      this.menuClick(menuItem, event)
    }
  }

  getIconClass(itemIcon) {
    if (!itemIcon) return
    if (itemIcon.startsWith('fa-')) return `fa ${itemIcon}`
    if (itemIcon.startsWith('mdi-')) return `mdi ${itemIcon}`
  }
}

export default () => ({
  restrict: 'E',
  replace: true,
  controllerAs: 'dropCtrl',
  bindToController: true,
  transclude: true,
  template: require('./dropdown.html'),
  controller: Controller,
  scope: {
    color: '@',
    menuItems: '<',
    menuClick: '=',
    menuClass: '@',
    buttonClass: '@',
    iconLeft: '@',
    iconRight: '@',
    iconSolo: '@',
    icon: '@',
    isLoading: '<',
    isDisabled: '<'
  }
})
