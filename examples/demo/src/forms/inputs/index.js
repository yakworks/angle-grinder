import exampleModule from './inputs'
import basic from './basic'
import vertical from './vertical'
import './styles.scss'

const template = `
<div class="inputDemoIndex">
  <input-basic-example></input-basic-example>
  <input-horizontal-example></input-horizontal-example>
  <ag-input-example></ag-input-example>
</div>
`
// export module name
export default angular
  .module('ag.demo.agInputs-all', [exampleModule, basic, vertical])
  .component('agInputDemoIndex', { template })
  .name
