import AgBaseComponent from '../AgBaseComponent'
import compDefaults from '../utils/componentDirective'
import scopeDefaults from '../utils/scopeDefaults'

/* @ngInject */
class Controller extends AgBaseComponent {
  // constructor($element) {
  //   super($element)
  // }

  $onInit() {
    super.onInit()
    super.validate()
  }

  onChange() {
    super.onChange()
    super.validate()
  }

  hasLabel() {
    return !!this.label
  }
}

export default () => ({
  ...compDefaults,
  template: require('./ag-input.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^form'
  },
  scope: {
    ...scopeDefaults.formComp,
    ngModel: '=',
    type: '@',
    minimumLength: '@',
    maximumLength: '@'
  }
})
