import AgBaseControl from '../AgBaseControl'

class Controller extends AgBaseControl {
  $onInit() {
    super.onInit()
    if (!this.maxLength) {
      this.maxLength = 255
    }
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-textarea.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    minLength: '@',
    maxLength: '@',
    rows: '@'
  }
})
