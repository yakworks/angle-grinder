import exampleModule from './example.component'
import './styles.scss'

const template = `
<demo-title-crumb></demo-title-crumb>
<div class="container-fluid container-fullw demoDropdownIndex">
  <dropdown-example></dropdown-example>
</div>
`
// export module name
export default angular
  .module(exampleModule)
  .component('demoDropdownIndex', { template })
  .name
