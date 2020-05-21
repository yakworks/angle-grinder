import exampleModule from './inputs'
import basicModule from './basic'
import './styles.scss'

const template = `
<div class="inputDemoIndex">
  <ag-input-example></ag-input-example>
  <bulma-example></bulma-example>
</div>
`
// export module name
export default angular
  .module('ag.demo.agInputs-all', [exampleModule, basicModule])
  .component('agInputDemoIndex', { template })
  .name
