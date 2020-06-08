import compDemoModule from './tagInput'
// Import Raw Files
import htmlRaw from '!raw-loader!./tag-input.html'
import jsRaw from '!raw-loader!./tagInput'

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="500px">
  <tag-input-demo/>
</example-snippet>
`

// export the module name
export default angular
  .module('ag.demo.tagInput')
  .component('tagInputExample', {
    template,
    controller
  })
  .name // .name returns the module name
