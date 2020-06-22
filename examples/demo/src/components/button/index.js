import exampleModule from './demo'
import colorsStatesModule from './colors-states'
import './styles.scss'

const template = `
<div class="buttonDemoIndex">
  <p>Basic Default Example</p>
  <button-example></button-example>
  <p>Colors and States</p>
  <button-colors-example></button-colors-example>
</div>
`
// export module name
export default angular
  .module('ag.demo.buttonDemo-all', [exampleModule, colorsStatesModule])
  .component('buttonDemoIndex', { template })
  .name
