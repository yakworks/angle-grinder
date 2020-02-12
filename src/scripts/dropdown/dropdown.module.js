// Import Resources
import DropdownComponent from './dropdown.component'
import './dropdown.scss'

// Register module, register component and export name
export default angular
  .module('ag.components.dropdown', [])
  .component('agDropdown', DropdownComponent)
  .name
