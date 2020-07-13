import template from './component.html'

class controller {
  vm = {}
}

export default angular.module('demo.amountDemo', [])
  .component('amountExample', {template, controller})
  .name
