import compController from './component'
import compTpl from './component.html'
// import './triage.scss'

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd'>
  <input-wildcard-example></input-wildcard-example>
</example-snippet>
`

export default angular
  .module('ag.demo.inputWildcardExample', [])
  .component('inputWildcardExample', {
    template: compTpl,
    controller: compController
  })
  .component('agInputWildcardIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./component.html')
      this.rawJs = require('!raw-loader!./component.js').default
    }
  }).name
