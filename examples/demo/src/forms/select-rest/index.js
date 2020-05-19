import exampleModule from './selRestExample'

const template = `
<div class="inputDemoIndex">
  <sel-rest-example/>
</div>
`

// export module name
export default angular
  .module('ag.demo.sel-rest', [exampleModule])
  .component('selRestDemoIndex', { template })
  .name
