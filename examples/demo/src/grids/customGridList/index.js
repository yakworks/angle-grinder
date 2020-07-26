import compDemoModule from './list/listComp'
import editComp from "./edit/editComp";
const template = `
<example-snippet is-horizontal raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' >
  <basic-rest-grid-demo config-key="$ctrl.configKey"></basic-rest-grid-demo>
</example-snippet>
`
export default angular
.module(compDemoModule)
  .component('basicGridRestIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./list/list.html')
      this.rawJs = require('!raw-loader!./list/listComp.js').default
    }
  }).name

