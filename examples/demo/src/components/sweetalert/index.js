import component from './component'

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd'>
  <sweetalert-demo></sweetalert-demo>
</example-snippet>
`

// export module name
export default angular
  .module('ag.demo.sweetalertDemoIndex', [])
  .component('sweetalertDemo', component)
  .component('sweetalertDemoIndex', {
    template: template,
    controller: function() {
      this.rawHtml = require('./component.html')
      // this.rawMd = require('!raw-loader!./docs.md').default
      this.rawJs = require('!raw-loader!./component.js').default
    }
  }).name
