import template from './checkbox.html'

class controller {
  vm = {
    defaultCheckbox: true,
    successCheck: true,
    infoCheck: 'on',
    warningCheck: 100,
    dangerCheck: 1,
    normalFalse: false,
    stringFalse: 'false',
    emptyString: '',
    defaultZero: 0
  }
}

export default angular.module('ag.demo.checkbox', [])
  .component('checkboxDemo', { template, controller })
  .name
