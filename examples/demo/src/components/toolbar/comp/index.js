import demoCompModule from './component'
// Import Raw Files
import htmlRaw from '!raw-loader!./component.html';
import jsRaw from '!raw-loader!./component.js';

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="500px">
  <toolbar-comp-demo/>
</example-snippet>
`

// export the module name
export default angular
  .module(demoCompModule)
  .component('toolbarCompExample', {
    template,
    controller
  })
  .name // .name returns the module name
