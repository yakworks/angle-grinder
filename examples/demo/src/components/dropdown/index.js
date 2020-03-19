import exampleModule from './example.component'
import './styles.scss'

const template = `
<demo-title-crumb></demo-title-crumb>
<div class="dropdownDemoIndex">
  <dropdown-example></dropdown-example>
</div>
`
// export module name
export default angular
  .module(exampleModule)
  .component('dropdownDemoIndex', { template })
  .name
