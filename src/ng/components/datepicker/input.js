import AgBaseControl from '../AgBaseControl'
// see https://mymth.github.io/vanillajs-datepicker/#/
import { Datepicker } from 'vanillajs-datepicker'
import Log from '../../../utils/Log'
import _ from 'lodash'

class Controller extends AgBaseControl {
  isoFormat = 'yyyy-mm-dd'
  datepickerOptions = {}
  opts = {
    autohide: true,
    clearBtn: true,
    showOnFocus: false,
    todayBtn: true,
    buttonClass: 'button is-flat is-white',
    format: 'mm/dd/yyyy'
  }

  /* @ngInject */
  constructor($element, $timeout, $scope, agDate) {
    super($element, $timeout, $scope)
    this.agDate = agDate
  }

  $onInit() {
    Log.debug('onInit parentCtrl', this.parentCtrl)

    // sets up unique id, etc..
    super.initDefaults()

    const { ngModelCtrl, $element, $timeout } = this

    _.merge(this.opts, this.datepickerOptions)
    // const options = angular.extend(defaultOptions, this.$scope.$eval(this.datepickerOptions))

    const input = $element[0].querySelector('.input.is-datepicker')
    // const input = $element[0]

    $timeout(() => {
      this.datepicker = new Datepicker(input, this.opts)
    })
    // input.addEventListener('changeDate', function(e){
    //   Log.debug('changeDate', e)
    // });

    this.ngModelCtrl.$render = () => {
      const dateVal = Datepicker.parseDate(ngModelCtrl.$viewValue, this.isoFormat)
      this.value = Datepicker.formatDate(dateVal, this.opts.format)
    }
  }

  onChange() {
    const dateVal = Datepicker.parseDate(this.value, this.opts.format)
    const isoDate = Datepicker.formatDate(dateVal, this.isoFormat)
    this.ngModelCtrl.$setViewValue(isoDate)
    Log.debug('onChange', isoDate)
    // if dialog is open then update the change there too
    if (this.datepicker.active) this.datepicker.update()
  }

  onBlur() {
    Log.debug('onBlur')
    this.datepicker.update()
  }

  $onDestroy() {
    this.datepicker.destroy()
  }
}

const template = `
<input
  type="text"
  class="input is-datepicker"
  ng-class="$ctrl.inputClass"
  placeholder="{{$ctrl.placeholder}}"
  name="{{$ctrl.name}}"
  id="{{$ctrl.id}}"
  ng-model="$ctrl.value"
  ng-model-options='{ debounce: 500 }'
  ng-change="$ctrl.onChange()"
  ng-blur="$ctrl.onBlur()"
  ng-required="{{$ctrl.isRequired}}"
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
    parentCtrl: '=',
    modelKey: '@',
    datepickerOptions: '@'
  }
})
