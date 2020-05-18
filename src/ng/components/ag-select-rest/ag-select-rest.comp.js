import angular from 'angular'
import AgSelectRestCtrl from './AgSelectRestCtrl'

const MOD_NAME = 'forms.ag-selectRest'
export default MOD_NAME
angular
  .module(MOD_NAME, [])
  .component('agSelectRest', {
    transclude: true,
    template: require('./ag-select-rest.comp.html'),
    controller: AgSelectRestCtrl,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel'
    },
    bindings: {
      url: '@',
      output: '@',
      inputLength: '@',
      multiple: '@',
      label: '@',
      name: '@',
      required: '@'
    }
  })
