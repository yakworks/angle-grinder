import compDemoModule from './textarea'
// Import Raw Files
import htmlRaw from '!raw-loader!./textarea.html'
import jsRaw from '!raw-loader!./textarea.js'

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="500px">
  <textarea-demo/>
</example-snippet>
`

// export the module name
export default angular
  .module(compDemoModule)
  .component('textareaExample', {
    template,
    controller
  })
  .name // .name returns the module name
