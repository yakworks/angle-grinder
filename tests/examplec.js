import template from './dropdown.html'

/**
 * Some info on Module
 * @module ag-demo
 *
 * @example `<ag-demo> name </ag-demo>`
 */

/**
 * Compont bindings
 *
 * @prop {String}    color=default - `@` The default values for parties.
 * @prop {MenuItem}  menuItems* - The default number of players.
 * @prop {MenuClick} menuClick - The default funtion to call when menu item is clicked.
 * @prop {Sring}     content - the label for the button
 */
const bindings = {
  color: '@',
  menuItems: '<',
  menuClick: '='
}

/**
 * MenuClick call back function
 *
 * @callback menuClick
 * @param {MenuItem} menuItem - the menu item object that was clicked
 * @param {Object} event - the event object
 */

/**
 * MenuItem - The meta info for the menu items
 *
 * @typedef {Object}    MenuItem
 * @property {String}   content  - the text or html to show for the item
 * @property {MenuClick} action  - the function to call on click
 * @property {String}   class   - the CSS class to add
 * @property {boolean}  divider - set to true to show divider, should be the only one here
 */

class controller {

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
  bindings,
  template,
  controller
}
