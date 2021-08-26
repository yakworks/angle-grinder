import compDemoModule from './component'

const template = `
<example-snippet is-horizontal raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd'>
  <tiles-demo></tiles-demo>
</example-snippet>
`
// export module name
export default angular
  .module(compDemoModule)
  .component('tilesCardsIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./component.html')
      this.rawJs = require('!raw-loader!./component.js').default
    }
  }).name
