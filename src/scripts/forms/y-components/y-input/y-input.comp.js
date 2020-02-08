import angular from 'angular'
import YInputCtrl from './YInputCtrl'

export default angular
  .module('forms.yinput', [])
  .component('yInput', {
    transclude: true,
    template: require('./y-input.comp.html'),
    // controller: ["$attrs", InputTextComponent],
    controller: YInputCtrl,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel',
      formCtrl: '^form',
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
