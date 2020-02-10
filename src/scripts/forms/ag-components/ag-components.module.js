import angular from 'angular'
import agInputModule from './ag-input/ag-input.comp'
import agSelectModule from './ag-select/ag-select.comp'
import InputPasswordComponent from './ag-password/input-password.component'
// import StringUtility from './string-utility';

const MOD_NAME = 'forms.ag-components'
export default MOD_NAME

angular
  .module(MOD_NAME, [agSelectModule, agInputModule])
  .component('agInputPassword', {
    template: require('./ag-password/input-password.component.html'),
    controller: InputPasswordComponent,
    controllerAs: 'vm',
    require: {
      ngModelCtrl: 'ngModel'
    },
    bindings: {
      label: '@',
      minimumLength: '@',
      maximumLength: '@',
      name: '@',
      required: '@'
    }
  })
