import angular from 'angular'
import yInputModule from './y-input/y-input.comp'
import ySelectModule from './y-select/y-select.comp'
import InputPasswordComponent from './y-password/input-password.component'
// import StringUtility from './string-utility';

const MOD_NAME = 'forms.ycomponents'
export default MOD_NAME

angular
  .module(MOD_NAME, [ySelectModule, yInputModule])
  .component('yInputPassword', {
    template: require('./y-password/input-password.component.html'),
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
