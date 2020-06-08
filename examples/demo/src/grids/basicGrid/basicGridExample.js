import compDemoModule from './component'
// Import Raw Files
import htmlRaw from '!raw-loader!./list.html'
import jsRaw from '!raw-loader!./listCtrl'

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet is-horizontal raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' >
  <basic-demo-grid>
</example-snippet>
`

// export the module name
export default angular
  .module('app')
  .component('basicGridExample', {
    template,
    controller
  })
  .name // .name returns the module name
