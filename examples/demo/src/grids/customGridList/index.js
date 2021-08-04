import ListCtrl from './list/ListCtrl'
import listtpl from './list/list.html'
import EditCtrl from './edit/EditCtrl'
import editTpl from './edit/edit.html'
// import editComp from "./edit/editComp";
const template = `
<example-snippet is-horizontal raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' >
  <custom-rest-grid-demo config-key="$ctrl.configKey"></custom-rest-grid-demo>
</example-snippet>
`
export default angular
  .module('ag.demo.customRestGridDemo', [])
  .component('customRestGridDemo', {
    template: listtpl,
    controller: ListCtrl
  })
  .component('customRestEditDemo', {
    template: editTpl,
    controller: EditCtrl,
    bindings: {
      apiKey: '<',
      notification: '<'
    }
  })
  .component('basicGridRestIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./list/list.html')
      this.rawJs = require('!raw-loader!./list/ListCtrl.js').default
    }
  }).name
