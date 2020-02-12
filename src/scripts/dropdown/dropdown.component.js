// Import Template
import template from './dropdown.html'

const DEFAULT_MENU_DISPLAY = 'Action'

// Set up controller
class Controller {
  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    this.menuDisplay = this.menuDisplay || DEFAULT_MENU_DISPLAY
    this.buttonStyle = this.buttonStyle || 'default'
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
    menuItems: '<',
    menuClick: '='
  },
  template,
  controller: Controller
}
