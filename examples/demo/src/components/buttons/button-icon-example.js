import buttonIconDemoModule from './button-icon-demo'

// Import Raw Source Files
import htmlRaw from '!raw-loader!./button-icon-demo.html';
import jsRaw from '!raw-loader!./button-icon-demo.js';
//import mdRaw from '!raw-loader!./button-icon.md';

class controller {
  html = htmlRaw
  js = jsRaw
  //md = mdRaw
}

const template = `
<p>
  Some description
</p>
<div class="example-section">
  <div class="example is-vertical">
    <div class="example-component">
      <button-icon-demo></button-icon-demo>
    </div>
    <div class="codeview">
      <demo-snippet raw-js='$ctrl.js' raw-html='$ctrl.html' max-height="300px"></demo-snippet>
    </div>
  </div>
</div>
`

angular.module(buttonIconDemoModule)
  .component('buttonIconExample', { template, controller })

export default buttonIconDemoModule
