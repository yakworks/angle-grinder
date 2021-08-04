import compDemoModule from './component'
// Import Raw Files
// eslint-disable-next-line import/no-webpack-loader-syntax
import htmlRaw from '!raw-loader!./component.html'
import jsRaw from '!raw-loader!./component.js'

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml'>
  <button-demo></button-demo>
</example-snippet>
`
// export the module name
export default angular
  .module(compDemoModule)
  .component('buttonExample', {
    template,
    controller
  }).name // .name returns the module name
