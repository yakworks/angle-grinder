// Import Resources
import ButtonComponent from './button.component'
import './button.scss'

// Register module, register component and export name
export default angular
  .module('ag.components.button', [])
  .component('agButton', ButtonComponent)
  .name
