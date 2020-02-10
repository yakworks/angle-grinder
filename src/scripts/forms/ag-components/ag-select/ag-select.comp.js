import angular from 'angular'
import AgSelectCtrl from './AgSelectCtrl'

const MOD_NAME = 'forms.ag-select'
export default MOD_NAME

angular
  .module(MOD_NAME, [])
  .component('agSelect', {
    transclude: true,
    template: require('./ag-select.comp.html'),
    controller: AgSelectCtrl,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel'
    },
    bindings: {
      items: '<',
      label: '@',
      minimumLength: '@',
      maximumLength: '@',
      name: '@',
      required: '@'
    }
  })
