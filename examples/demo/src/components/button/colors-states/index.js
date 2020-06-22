import compDemoModule from './component'

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' >
  <button-colors-demo></button-colors-demo>
</example-snippet>
`
// export the module name
export default angular
  .module(compDemoModule)
  .component('buttonColorsExample', {
    template: template,
    controller: function() {
      this.rawHtml = require('./component.html')
      this.rawJs = require('!raw-loader!./component.js').default //js as text hack
    }
  }).name // .name returns the module name
