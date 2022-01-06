import AgBaseControl from '../AgBaseControl'
import { displayDateToIso } from '../../../utils/dateSupport'

class Controller extends AgBaseControl {

  $onInit() {
    super.onInit()
    const { ngModelCtrl, $element } = this

    ngModelCtrl.$render = () => {
      this.value = new Date(ngModelCtrl.$viewValue) //parseDate(ngModelCtrl.$viewValue)
    }
  }

  onChange() {
    const isoDate = displayDateToIso(this.value)
    this.ngModelCtrl.$setViewValue(isoDate)
  }

  onBlur() {
    const isoDate = displayDateToIso(this.value)
    this.ngModelCtrl.$setViewValue(isoDate)
  }

  onEnter(event) {
    const isoDate = displayDateToIso(this.value)
    this.ngModelCtrl.$setViewValue(isoDate)
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-date.html'),
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