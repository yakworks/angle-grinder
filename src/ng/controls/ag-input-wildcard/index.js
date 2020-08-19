import AgBaseControl from '../AgBaseControl'

class Controller extends AgBaseControl {
  wildcard = true
  $onInit() {
    super.onInit()
    // this.wildcard = true
    if (!this.maxLength) {
      this.maxLength = 50
    }

    this.ngModelCtrl.$render = () => {
      let vval = this.ngModelCtrl.$viewValue
      if (vval && vval.endsWith('%')) vval = vval.slice(0, -1)
      this.value = vval
    }
  }

  onChange() {
    let vval = this.value
    if (vval && this.wildcard) vval = `${vval}%`
    this.ngModelCtrl.$setViewValue(vval)
  }

  toggleWildcard() {
    this.wildcard = !this.wildcard
    this.onChange()
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-input-wildcard.html'),
  controller: Controller,
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
