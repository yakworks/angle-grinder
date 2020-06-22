import compDemoModule from './component'

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd'>
  <dropdown-demo></dropdown-demo>
</example-snippet>
`
// export module name
export default angular
  .module(compDemoModule)
  .component('dropdownDemoIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./component.html')
      this.rawMd = require('!raw-loader!./docs.md').default
      this.rawJs = require('!raw-loader!./component.js').default
    }
  }).name
