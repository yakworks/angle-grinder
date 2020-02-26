import exampleModule from './demo'
import colorsStatesModule from './colors-states'
import './styles.scss'

const template = `
<demo-title-crumb></demo-title-crumb>
<div class="container-fluid container-fullw buttonDemoIndex">
  <button-example></button-example>
  <button-colors-example></button-colors-example>
</div>
`
// export module name
export default angular
  .module('ag.demo.buttonDemo-all', [ exampleModule, colorsStatesModule])
  .component('buttonDemoIndex', { template })
  .name