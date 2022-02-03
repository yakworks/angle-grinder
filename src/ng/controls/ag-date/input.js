import AgBaseControl from '../AgBaseControl'
import { displayDateToIso, parseIsoDate } from '@yakit/core/date/dateSupport'


class Controller extends AgBaseControl {

  $onInit() {
    if (this.inputId) {
      this.elementId = this.inputId
    }
    // sets up unique id, etc..
    super.initDefaults()
    const { ngModelCtrl, $element } = this

    ngModelCtrl.$render = () => {
      this.value = parseIsoDate(ngModelCtrl.$viewValue)
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

const template = `
<input
  type="date"
  class="input date5"
  ng-class="$ctrl.inputClass"
  placeholder="{{$ctrl.placeholder}}"
  name="{{$ctrl.name}}"
  id="{{$ctrl.elementId}}"
  ng-keydown="$event.keyCode === 13 && $ctrl.onEnter($event)"
  ng-model="$ctrl.value"
  ng-model-options='{ debounce: 500 }'
  ng-change="$ctrl.onChange()"
  ng-blur="$ctrl.onBlur()"
  ng-required="{{$ctrl.isRequired}}"
  ng-disabled="{{$ctrl.isDisabled}}"
>
`
export default () => ({
  ...AgBaseControl.common.dir,
  replace: false,
  template: template,
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope,
    inputId: '@'
  }
})
