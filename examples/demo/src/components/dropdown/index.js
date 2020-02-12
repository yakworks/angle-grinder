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
  $onInit() {
    let snipCtrl = this.$element.find("demo-snippet").controller()
    snipCtrl.html = htmlRaw
    snipCtrl.js = jsRaw
    snipCtrl.md = mdRaw

  }

  get title() {
    return appState.title
  }
}

const template = `
<demo-title-crumb></demo-title-crumb>
<div class="bd-snippet bd-is-vertical bd-is-2">
  <div class="bd-snippet-preview">
    <dropdown-demo></dropdown-demo>
    <div ng-if="$ctrl.md" markdown-to-html="$ctrl.md"></div>
  </div>
  <div class="bd-snippet-code">
    <demo-snippet raw-js='$ctrl.js' raw-html='$ctrl.html' max-height="300px"></demo-snippet>
  </div>
<div>
`

angular.module(dropdownDemoModule)
  .component('dropdownDemoIndex', {
    template,
    controller
  })

export default dropdownDemoModule
