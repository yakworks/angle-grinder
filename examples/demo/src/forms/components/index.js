import exampleModule from './inputs'
import './styles.scss'

const template = `
<div class="inputDemoIndex">
  <ag-input-example></ag-input-example>
</div>
`
// export module name
export default angular
  .module('ag.demo.agInputs-all', [exampleModule])
  .component('agInputDemoIndex', { template })
  .name
