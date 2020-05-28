import AgBaseControl from '../AgBaseControl'

// The bootstrap version
/* @ngInject */
class Controller extends AgBaseControl {
  // constructor($element) {
  //   super($element)
  // }

  $onInit() {
    super.onInit()
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-input.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^form'
  },
  scope: {
    ...AgBaseControl.common.scope,
    type: '@',
    minimumLength: '@',
    maximumLength: '@'
  }
})
