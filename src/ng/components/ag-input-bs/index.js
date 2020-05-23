import AgBaseComponent from '../AgBaseControl'
import compDefaults from '../utils/componentDirective'
import scopeDefaults from '../utils/scopeDefaults'
// The bootstrap version
/* @ngInject */
class Controller extends AgBaseComponent {
  // constructor($element) {
  //   super($element)
  // }

  $onInit() {
    super.onInit()
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
    type: '@',
    minimumLength: '@',
    maximumLength: '@'
  }
})
