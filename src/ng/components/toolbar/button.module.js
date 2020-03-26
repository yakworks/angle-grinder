// Import Resources
import ButtonComponent from './button.component'
import rippleModule from './ripple'
import './button.scss'

// Register module, register component and export name
export default angular
  .module('ag.components.button', [rippleModule])
  .component('agButton', ButtonComponent)
  .name
