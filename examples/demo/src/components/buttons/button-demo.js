import template from './button-demo.html';

class controller {
}

// Register module, register component and export name
export default angular
  .module('module.demo.buttonDemo', [])
  .component('buttonDemo', { template, controller })
  .name;
