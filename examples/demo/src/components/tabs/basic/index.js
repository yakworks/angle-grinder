import compDemoModule from './component'
// Import Raw Files
import htmlRaw from '!raw-loader!./component.html'
import jsRaw from '!raw-loader!./component'

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
  .module(compDemoModule)
  .component('basicTabsExample', {
    template,
    controller
  })
  .name // .name returns the module name
