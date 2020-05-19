import compDemoModule from './selectRest'
// Import Raw Files
import htmlRaw from '!raw-loader!./select-rest.html'
import jsRaw from '!raw-loader!./selectRest.js'

class controller {
  html = htmlRaw
  js = jsRaw
}

const template = `
<div class="example-section mb-4">
  <h4>ag-input</h4>
  <div class="example is-vertical">
    <div class="example-component">
      <sel-rest-demo/>
    </div>
    <div class="codeview">
      <demo-snippet raw-js='$ctrl.js' raw-html='$ctrl.html' raw-md='$ctrl.md' max-height="400px"></demo-snippet>
    </div>
  </div>
</div>
`
// export the module name
export default angular
  .module(compDemoModule)
  .component('selRestExample', {
    template,
    controller
  })
  .name // .name returns the module name
