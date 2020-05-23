import angular from 'angular'
import AgCheckboxCtrl from './AgCheckboxCtrl'

export default angular
  .module('forms.ag-checkbox', [])
  .directive('agCheckbox', () => ({
    restrict: 'E',
    replace: true,
    template: require('./ag-checkbox.comp.html'),
    controller: AgCheckboxCtrl,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel',
      formCtrl: '^form'
    },
    bindToController: true,
    scope: {
      ngModel: '=',
      label: '@',
      hint: '@',
      name: '@'
    }
  }))
  .name
