import compDemoModule from './component'

const template = `
<example-snippet is-horizontal raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd'>
  <flex-card-demo></flex-card-demo>
</example-snippet>
`
// export module name
export default angular
  .module(compDemoModule)
  .component('flexCardDemoIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./component.html')
      this.rawJs = require('!raw-loader!./component.js').default
    }
  }).name
