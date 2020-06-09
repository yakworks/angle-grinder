import exampleModule from './tagInputExample'

const template = `
<div class="inputDemoIndex">
  <tag-input-example/>
</div>
`
// export module name
export default angular
  .module('ag.demo.tagInput')
  .component('tagInputDemoIndex', { template })
  .name
