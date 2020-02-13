import buttonDemoModule from './button-demo'

// Import Raw Source Files
import htmlRaw from '!raw-loader!./button-demo.html';
import jsRaw from '!raw-loader!./button-demo.js';
import mdRaw from '!raw-loader!./button-demo.md';

class controller {
  html = htmlRaw
  js = jsRaw
  md = mdRaw
}

const template = `
<p>
  Some description
</p>
<div class="example-section">
  <div class="example is-vertical">
    <div class="example-component">
      <button-demo></button-demo>
    </div>
    <div class="codeview">
      <demo-snippet raw-js='$ctrl.js' raw-html='$ctrl.html' raw-md='$ctrl.md' max-height="300px"></demo-snippet>
    </div>
  </div>
</div>
`

angular.module(buttonDemoModule)
  .component('buttonDemoExample', { template, controller })

export default buttonDemoModule
