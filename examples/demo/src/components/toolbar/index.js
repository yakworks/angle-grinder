import exampleModule from './example.component'
import './styles.scss'

const template = `
<div class="toolbarDemoIndex">
  <toolbar-demo-example></toolbar-demo-example>
</div>
`
// export module name
export default angular
  .module(exampleModule)
  .component('toolbarDemoIndex', { template })
  .name
