import htmlModule from './html'
import compModule from './comp'

const template = `
<div class="toolbarDemoIndex">
  <toolbar-html-example></toolbar-html-example>
  <toolbar-comp-example></toolbar-comp-example>
</div>
`
// export module name
export default angular
  .module('ag.demo.toolbarDemoIndex', [htmlModule, compModule])
  .component('toolbarDemoIndex', { template })
  .name
