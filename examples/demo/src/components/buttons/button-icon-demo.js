import template from './button-icon-demo.html';

class controller {
}

// Register module, register component and export name
export default angular
  .module('module.demo.buttonIconDemo', [])
  .component('buttonIconDemo', { template, controller })
  .name;
