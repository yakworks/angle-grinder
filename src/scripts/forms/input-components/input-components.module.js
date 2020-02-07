import angular from 'angular'
import YInputCtrl from './input-text/YInputCtrl'
import YSelectCtrl from './input-select/YSelectCtrl'
import InputPasswordComponent from './input-password/input-password.component'
// import StringUtility from './string-utility';

const MOD_NAME = 'inputComponents'
export default MOD_NAME

angular
  .module(MOD_NAME, [])
  .component('yInput', {
    transclude: true,
    template: require('./input-text/y-input.component.html'),
    // controller: ["$attrs", InputTextComponent],
    controller: YInputCtrl,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel'
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
  .component('ySelect', {
    transclude: true,
    template: require('./input-select/y-select.component.html'),
    controller: YSelectCtrl,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel'
    },
    bindings: {
      optionsData: '<',
      label: '@',
      minimumLength: '@',
      maximumLength: '@',
      name: '@',
      required: '@'
    }
  })
  .component('yInputPassword', {
    template: require('./input-password/input-password.component.html'),
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
