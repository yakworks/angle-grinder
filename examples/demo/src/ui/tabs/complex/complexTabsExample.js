import compDemoModule from './component'
// Import Raw Files
import htmlRaw from '!raw-loader!./complex_tabs.html'
import jsRaw from '!raw-loader!./index'

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet is-horizontal raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' >
  <complex-demo-tabs>
</example-snippet>
`

// export the module name
export default angular
  .module('app')
  .component('complexTabsExample', {
    template,
    controller
  })
  .name // .name returns the module name
