import compDemoModule from './component'
// Import Raw Files
import htmlRaw from '!raw-loader!./ui_tabs.html'
import jsRaw from '!raw-loader!./index'

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet is-horizontal raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' >
  <demo-tabs>
</example-snippet>
`

// export the module name
export default angular
  .module('app')
  .component('basicTabsExample', {
    template,
    controller
  })
  .name // .name returns the module name
