import compDemoModule from './checkbox'
// Import Raw Files
import htmlRaw from '!raw-loader!./checkbox.html'
import jsRaw from '!raw-loader!./checkbox.js'

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="500px">
  <checkbox-demo/>
</example-snippet>
`

// export the module name
export default angular
  .module('ag.demo.checkbox')
  .component('checkboxExample', {
    template,
    controller
  })
  .name // .name returns the module name
