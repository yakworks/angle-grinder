import exampleModule from './inputs'
import './styles.scss'

const template = `
<demo-title-crumb></demo-title-crumb>
<div class="container-fluid container-fullw buttonDemoIndex">
  <ag-input-example></ag-input-example>
</div>
`
// export module name
export default angular
  .module('ag.demo.agInputs-all', [exampleModule])
  .component('agInputDemoIndex', { template })
  .name
