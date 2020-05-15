import angular from 'angular'
import AgInputCtrl from './AgInputCtrl'

export default angular
  .module('forms.ag-input', [])
  .directive('agInput', () => ({
    restrict: 'E',
    replace: true,
    transclude: true,
    template: require('./ag-input.comp.html'),
    controller: AgInputCtrl,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel',
      formCtrl: '^form'
    },
    bindToController: true,
    scope: {
      ngModel: '=',
      label: '@',
      minimumLength: '@',
      maximumLength: '@',
      name: '@',
      type: '@',
      placeholder: '@',
      required: '@'
    }
  }))
  .name
