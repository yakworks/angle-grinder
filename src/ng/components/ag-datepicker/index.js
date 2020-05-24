import AgBaseControl from '../AgBaseControl'

class Controller extends AgBaseControl {
  $onInit() {
    super.onInit()
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-datepicker.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    type: '@',
    dateType: '@'
  }
})
