import exampleModule from './textareaExample'

const template = `
<div class="inputDemoIndex">
  <textarea-example/>
</div>
`

// export module name
export default angular
  .module('ag.demo.textarea')
  .component('textareaDemoIndex', { template })
  .name
