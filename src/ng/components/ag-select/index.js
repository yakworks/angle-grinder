/* eslint-disable no-useless-constructor, no-unused-vars */
import angular from 'angular'
import AgBaseComponent from '../AgBaseControl'
import _ from 'lodash'

const MOD_NAME = 'forms.ag-select'
export default MOD_NAME

/* @ngInject */
class controller extends AgBaseComponent {
  $onInit() {
    super.onInit()
    if (this.isRequired === true) {
      // if not spcifically setting allowClear then set to false by default if its a required field
      if (!_.has(this.selectOptions, 'allowClear')) {
        this.selectOptions.allowClear = false
      }
    }
  }
}

angular
  .module(MOD_NAME, [])
  .component('agSelect', {
    transclude: true,
    template: require('./ag-select2.comp.html'),
    controller: controller,
    controllerAs: 'cmpCtrl',
    require: {
      ngModelCtrl: 'ngModel'
    },
    bindings: {
      selectOptions: '<',
      label: '@',
      name: '@',
      placeholder: '@',
      required: '@'
    }
  })
