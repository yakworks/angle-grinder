import compDemoModule from './component'
// Import Raw Files
import htmlRaw from '!raw-loader!./component.html';
import jsRaw from '!raw-loader!./component.js';

class ExController {
  html = htmlRaw
  js = jsRaw
}

const template = `
<h1 class="is-title">Color and States</h1>
<div class="example-section mb-4">
  <div class="example is-vertical">
    <div class="example-component">
      <button-colors-demo> </button-colors-demo>
    </div>
    <div class="codeview">
      <demo-snippet raw-js='$ctrl.js' raw-html='$ctrl.html' raw-md='$ctrl.md' max-height="300px"></demo-snippet>
    </div>
  </div>
</div>
`
// export the module name
export default angular
  .module(compDemoModule)
  .component('buttonColorsExample', {
    template: template,
    controller: ExController
  })
  .name // .name returns the module name
