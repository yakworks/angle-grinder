import AgBaseControl from '../AgBaseControl'
// see https://mymth.github.io/vanillajs-datepicker/#/
import { Datepicker } from 'vanillajs-datepicker'
// import Log from '../../../utils/Log'
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
    super.onInit()
    const { ngModelCtrl, $element, $timeout } = this

    _.merge(this.opts, this.datepickerOptions)
    // const options = angular.extend(defaultOptions, this.$scope.$eval(this.datepickerOptions))

    // const elem = $element[0].querySelector('.input.is-datepicker')
    const input = $element.find('.input.is-datepicker')[0]

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
    // Log.debug('onChange isoDate' + this.id, isoDate)
    this.ngModelCtrl.$setViewValue(isoDate)
  }

  onBlur() {
    this.datepicker.update()
  }

  showDatepicker() {
    this.datepicker.show()
  }

  $onDestroy() {
    this.datepicker.destroy()
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
    dateType: '@',
    datepickerOptions: '@'
  }
})
