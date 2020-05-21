import compDemoModule from './comp'

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="500px">
  <bulma-demo></bulma-demo>
</example-snippet>
`
// export the module name
export default angular
  .module(compDemoModule)
  .component('bulmaExample', {
    template,
    controller: function() {
      this.rawHtml = require('./comp.html')
      this.rawJs = require('!raw-loader!./comp.js').default //js as text hack
    }
  })
  .name
