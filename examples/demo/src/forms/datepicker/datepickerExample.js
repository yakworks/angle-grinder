import compDemoModule from './datepicker'
// Import Raw Files
import htmlRaw from '!raw-loader!./datepicker.html'
import jsRaw from '!raw-loader!./datepicker.js'

class controller {
  rawHtml = htmlRaw
  rawJs = jsRaw
}

const template = `
<example-snippet raw-js='$ctrl.rawJs' raw-html='$ctrl.rawHtml' raw-md='$ctrl.rawMd' max-height="500px">
  <datepicker-demo/>
</example-snippet>
`

// export the module name
export default angular
  .module('ag.demo.datepicker')
  .component('datepickerExample', {
    template,
    controller
  })
  .name // .name returns the module name
