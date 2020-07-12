import compDemoModule from './component'

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd'>
  <validation-demo></validation-demo>
</example-snippet>
`
// export module name
export default angular
  .module(compDemoModule)
  .component('validationDemoIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./component.html')
      this.rawJs = require('!raw-loader!./component.js').default
    }
  }).name
