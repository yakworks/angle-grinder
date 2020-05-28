import AgBaseControl from '../AgBaseControl'

class Controller extends AgBaseControl {
  $onInit() {
    super.onInit()
    if (!this.maximumLength) {
      this.maximumLength = 50
    }
  }

  onChange() {
    try {
      if (this.value && this.maximumLength && this.value.length > this.maximumLength) {
        this.value = this.value.substring(0, this.maximumLength)
      }
    } catch (e) {
      // Log.debug('onChange error', e)
      this.value = ''
    }
    // Log.debug('onChange $setViewValue', this.value)
    this.ngModelCtrl.$setViewValue(this.value)
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-input.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    type: '@',
    minimumLength: '@',
    maximumLength: '@'
  }
})
