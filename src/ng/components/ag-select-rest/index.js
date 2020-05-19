import angular from 'angular'
import AgSelectRestCtrl from './AgSelectRestCtrl'
import './select-rest.scss'

const MOD_NAME = 'forms.ag-selectRest'
export default MOD_NAME
angular
  .module(MOD_NAME, [])
  .component('agSelectRest', {
    transclude: true,
    template: require('./select-rest.html'),
    controller: AgSelectRestCtrl,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel'
    },
    bindings: {
      url: '@',
      selectOptions: '<',
      multiple: '@',
      label: '@',
      name: '@',
      required: '@'
    }
  })
