import compDemoModule from './selectRest'
// Import Raw Files
import htmlRaw from '!raw-loader!./select-rest.html'
import jsRaw from '!raw-loader!./selectRest.js'

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="500px">
  <form name="selForm" ag-form class="form-horizontal-fixed" novalidate>
    <sel-rest-demo/>
  </form>
</example-snippet>
`

// export the module name
export default angular
  .module(compDemoModule)
  .component('selRestExample', {
    template,
    controller
  })
  .name // .name returns the module name
