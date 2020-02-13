// Import Template
import template from './dropdown.html'

const DEFAULT_MENU_DISPLAY = 'Action'

// Set up controller
class controller {
  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    this.menuDisplay = this.menuDisplay || DEFAULT_MENU_DISPLAY
    this.color = this.color || 'default'
  }

  fireMenuClick(menuItem, event) {
    // if it has an action then fire that
    if (menuItem.action) {
      menuItem.action(menuItem, event)
    } else if (this.menuClick) { // if there is a default then use it
      this.menuClick(menuItem, event)
    }
  }
}

// Define and export component
export default {
  transclude: true,
  bindings: {
    color: '@',
    menuItems: '<',
    menuClick: '='
  },
  template,
  controller
}
