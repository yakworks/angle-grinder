// Import Angular Resources
import template from './dropdown-demo.html';
import controller from './dropdown-demo.controller.js';

// Import Raw Files
import TemplateRaw from '!raw-loader!./dropdown-demo.html';
import ControllerRaw from '!raw-loader!./dropdown-demo.controller.js';
import MarkdownRaw from '!raw-loader!./dropdown-demo.md';

// manipulate controller to pass raw files up to demoCtrl
// controller.prototype.$onInit = function() {
//   this.demoCtrl.html = TemplateRaw;
//   this.demoCtrl.js = ControllerRaw;
//   this.demoCtrl.md = MarkdownRaw;
// };

// Component definition
const Component = {
  template,
  controller
};

// Register module, register component and export name
export default angular
  .module('module.dropdownDemo', [])
  .component('dropdownDemo', Component)
  .name;
