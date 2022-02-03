import AgBaseControl from '../AgBaseControl'
// see https://mymth.github.io/vanillajs-datepicker/#/
import { Datepicker } from 'vanillajs-datepicker'
import { mergeDatepickerOpts, isoDateToDisplay, displayDateToIso } from '@yakit/core/date/dateSupport'
// import Log from '../../../utils/Log'
// import _ from 'lodash'

class Controller extends AgBaseControl {
  isoFormat = 'yyyy-mm-dd'
  datepickerOptions = {}

  /* @ngInject */
  // constructor($element, $timeout, $scope, $transclude) {
  //   super($element, $timeout, $scope, $transclude)
  //   // this.agDate = agDate
  // }

  $onInit() {
    if (this.inputId) {
      this.elementId = this.inputId
    }
    // sets up unique id, etc..
    super.initDefaults()

    const { ngModelCtrl, $element } = this

    // Log.debug('this.datepickerOptions', this.datepickerOptions)
    this.opts = mergeDatepickerOpts(this.datepickerOptions)

    const input = $element[0].querySelector('.input.is-datepicker')
    // const input = $element[0]

    // $timeout(() => {
    this.$scope.$evalAsync(() => {
      this.datepicker = new Datepicker(input, this.opts)
    })
    // })
    // to add listeners for Datepicker
    // input.addEventListener('changeDate', function(e){
    //   Log.debug('changeDate', e)
    // });

    this.ngModelCtrl.$render = () => {
      this.value = isoDateToDisplay(ngModelCtrl.$viewValue)
    }
  }

  onChange() {
    // Log.debug('onChange this.value', this.value)
    const isoDate = displayDateToIso(this.value)
    this.ngModelCtrl.$setViewValue(isoDate)
    // if dialog is open then update the change there too
    //if (this.datepicker.active) this.datepicker.update()
  }

  onBlur() {
    const isoDate = displayDateToIso(this.value)
    this.ngModelCtrl.$setViewValue(isoDate)
    this.datepicker.update()
  }

  $onDestroy() {
    this.datepicker.destroy()
  }

  onEnter(event) {
    const isoDate = displayDateToIso(this.value)
    this.ngModelCtrl.$setViewValue(isoDate)
    this.datepicker.update()
  }
}

const template = `
<input
  type="date"
  class="input is-datepicker"
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
    datepickerOptions: '<',
    inputId: '@'
  }
})
