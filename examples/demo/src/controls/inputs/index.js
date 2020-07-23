import bsInputs from './bs-inputs'
import basic from './basic'
import horizontal from './horizontal'
import './styles.scss'

const template = `
<div class="inputDemoIndex">
  <input-horizontal-example></input-horizontal-example>
  <input-basic-example></input-basic-example>
  <!--<bs-input-example></bs-input-example>-->
</div>
`
// export module name
export default angular
  .module('ag.demo.agInputs-all', [bsInputs, basic, horizontal])
  .component('agInputDemoIndex', { template })
  .name
