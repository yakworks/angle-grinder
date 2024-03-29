import compDemoModule from './listComp'

const template = `\
<example-snippet is-horizontal raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' >
  <basic-grid-demo></basic-grid-demo>
</example-snippet>`

export default angular
  .module(compDemoModule)
  .component('localStoreIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./list.html')
      this.rawJs = require('!raw-loader!./listComp.js').default
    }
  }).name
