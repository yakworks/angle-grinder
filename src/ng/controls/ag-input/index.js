import AgBaseControl from '../AgBaseControl'

class Controller5 extends AgBaseControl {
  $onInit() {
    super.onInit()
    if (!this.maxLength) {
      this.maxLength = 50
    }
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-input.html'),
  controller: Controller5,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    type: '@',
    minLength: '@',
    maxLength: '@'
  }
})
