import compDemoModule from './comp'

import htmlRaw from '!raw-loader!./comp.html'
import jsRaw from '!raw-loader!./comp.js'
// import mdRaw from '!raw-loader!./docs.md';

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
  // rawMd = mdRaw
}

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="500px">
  <p>input element basic single select example with array of strings</p>
  <form name="selForm" ag-form class="form-horizontal-fixed" novalidate>
    <demo-sel-input/>
  </form>
</example-snippet>
`
// export the module name
export default angular.module(compDemoModule)
  .component('exSelBasic', { template, controller })
  .name
