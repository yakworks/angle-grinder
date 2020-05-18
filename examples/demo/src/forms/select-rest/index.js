import exampleModule from './sel-rest'

const template = `
<div >
  <sel-rest-example/>
</div>
`
// export module name
export default angular
  .module('ag.demo.sel-rest', [exampleModule])
  .component('selRestDemoIndex', { template })
  .name
