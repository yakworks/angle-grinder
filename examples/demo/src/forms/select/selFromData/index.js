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
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="300px">
  <p>options populated from controller</p>
  <form name="selForm" ag-form class="form-horizontal-fixed" novalidate>
    <demo-sel-data-input/>
  </form>
</example-snippet>
`
// export the module name
export default angular.module(compDemoModule)
  .component('exSelData', { template, controller })
  .name
