import angular from 'angular'
import AgInputCtrl from './AgInputCtrl'

export default angular
  .module('forms.ag-input', [])
  .component('agInput', {
    transclude: true,
    template: require('./ag-input.comp.html'),
    // controller: ["$attrs", InputTextComponent],
    controller: AgInputCtrl,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel',
      formCtrl: '^form'
    },
    bindings: {
      ngModel: '=',
      label: '@',
      minimumLength: '@',
      maximumLength: '@',
      name: '@',
      type: '@',
      required: '@'
    }
  })
  .name
