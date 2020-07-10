import compDemoModule from './listComp'

const template = `
<example-snippet is-horizontal raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' >
  <config-grid-demo></config-grid-demo>
</example-snippet>
`

export default angular
  .module(compDemoModule)
  .component('configGridIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./list.html')
      this.rawJs = require('!raw-loader!./listComp.js').default
    }
  }).name

