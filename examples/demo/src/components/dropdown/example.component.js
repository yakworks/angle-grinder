import dropdownDemoModule from './component'
// Import Raw Files
import htmlRaw from '!raw-loader!./component.html'
import jsRaw from '!raw-loader!./component.js'
import mdRaw from '!raw-loader!./docs.md'

class controller {
  html = htmlRaw
  js = jsRaw
  md = mdRaw
}

const template = `
<p>
    Lorem Ipsum
</p>
<div class="example-section">
  <div class="example is-vertical">
    <div class="example-component">
      <dropdown-demo></dropdown-demo>
    </div>
    <div class="codeview">
      <demo-snippet raw-js='$ctrl.js' raw-html='$ctrl.html' raw-md='$ctrl.md' max-height="300px"></demo-snippet>
    </div>
  </div>
</div>
`
// export the module name
export default angular
  .module(dropdownDemoModule)
  .component('dropdownExample', {
    template,
    controller
  })
  .name // .name returns the module name
