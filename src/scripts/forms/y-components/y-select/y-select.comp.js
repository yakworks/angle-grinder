import angular from 'angular'
import YSelectCtrl from './YSelectCtrl'

const MOD_NAME = 'forms.yselect'
export default MOD_NAME

angular
  .module(MOD_NAME, [])
  .component('ySelect', {
    transclude: true,
    template: require('./y-select.comp.html'),
    controller: YSelectCtrl,
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
