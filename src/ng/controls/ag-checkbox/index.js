import AgBaseControl from '../AgBaseControl'

class Controller extends AgBaseControl {
  $onInit() {
    super.onInit()
    const clazz = this.checkClass || ''
    // setup color class, is-primary, is-success, etc
    if (this.color) this.checkClass = `${clazz} is-${this.color}`

    if (this.isDense === '' || this.isDense === 'true') this.columnsClass = 'mb-0'

    this.ngModelCtrl.$render = () => {
      this.value = !!this.ngModelCtrl.$viewValue
    }
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-checkbox.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    color: '@'
  }
})
