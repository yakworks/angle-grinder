import compDemoModule from './comp'
// Import Raw Files
import htmlRaw from '!raw-loader!./comp.html';
import jsRaw from '!raw-loader!./comp.js';
import mdRaw from '!raw-loader!./docs.md';

class controller {
  html = htmlRaw
  js = jsRaw
  md = mdRaw
}

const template = `
<h1 class="is-title">ag-input</h1>
<div class="example-section mb-4">
  <div class="example is-vertical">
    <div class="example-component">
      <xedit1-demo></xedit1-demo>
    </div>
    <div class="codeview">
      <demo-snippet raw-js='$ctrl.js' raw-html='$ctrl.html' raw-md='$ctrl.md' max-height="500px"></demo-snippet>
    </div>
  </div>
</div>
`
// export the module name
export default angular
  .module(compDemoModule)
  .component('xedit1Example', {
    template,
    controller
  })
  .name // .name returns the module name
