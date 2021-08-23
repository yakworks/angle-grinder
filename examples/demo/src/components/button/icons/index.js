import compDemoModule from './component'

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' >
  <button-icons-demo></button-icons-demo>
</example-snippet>
`
// export the module name
export default angular
  .module(compDemoModule)
  .component('buttonIconsExample', {
    template: template,
    controller: function() {
      this.rawHtml = require('./component.html')
      // eslint-disable-next-line import/no-webpack-loader-syntax
      this.rawJs = require('!raw-loader!./component.js').default // js as text hack
    }
  }).name // .name returns the module name
