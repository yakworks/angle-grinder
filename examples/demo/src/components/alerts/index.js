import dropdownDemoModule from './dropdown-demo.module'
import appState from '~/scripts/utils/AppState'

// Import Raw Files
import htmlRaw from '!raw-loader!./dropdown-demo.html';
import jsRaw from '!raw-loader!./dropdown-demo.controller.js';
import mdRaw from '!raw-loader!./dropdown-demo.md';

class controller {
  html = htmlRaw
  js = jsRaw
  md = mdRaw

  constructor($element) {
    this.$element = $element;
  }
  // $onInit() {
  //   let snipCtrl = this.$element.find("demo-snippet").controller()
  //   snipCtrl.html = htmlRaw
  //   snipCtrl.js = jsRaw
  //   snipCtrl.md = mdRaw
  // }

  get title() {
    return appState.title
  }
}

const template = `
<demo-title-crumb></demo-title-crumb>
<div class="container-fluid container-fullw">
  <p>
      While it appear as a modal for tablet and smartphones,
      Dropdowns with <code>hoverable</code> prop won't change it's behavior to avoid any malfunction with hover.
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
</div>

`

angular.module(dropdownDemoModule)
  .component('dropdownDemoIndex', {
    template,
    controller
  })

export default dropdownDemoModule
