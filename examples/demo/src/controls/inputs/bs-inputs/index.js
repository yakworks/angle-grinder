import compDemoModule from './agInput'

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="700px">
  <p>ag-input</p>
  <bs-input-demo></bs-input-demo>
</example-snippet>
`
// export the module name
export default angular
  .module(compDemoModule)
  .component('bsInputExample', {
    template,
    controller: function() {
      this.rawHtml = require('./agInput.html')
      this.rawJs = require('!raw-loader!./agInput.js').default // js as text hack
    }
  })
  .name
