import template from './checkbox.html'

class controller {
  vm = {
    defaultTrue: true,
    defaultFalse: false,
    defaultOne: 1,
    defaultZero: 0,
  }
}

export default angular.module('ag.demo.checkbox', [])
  .component('checkboxDemo', { template, controller })
  .name
