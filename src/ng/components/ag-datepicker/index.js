import AgBaseControl from '../AgBaseControl'
import moment from 'moment'
import _ from 'lodash'

class Controller extends AgBaseControl {
  /* @ngInject */
  constructor($element, $timeout, $scope, agDate) {
    super($element, $timeout, $scope)
    this.agDate = agDate
  }

  $onInit() {
    super.onInit()
    const { agDate, ngModelCtrl, $element, $timeout } = this
    const defaultOptions = {
      format: agDate.getViewFormat(),
      isoFormat: agDate.getIsoFormat(this.dateType)
      // keepOpen: true,
      // debug: true
    }
    const options = angular.extend(defaultOptions, this.$scope.$eval(this.datepickerOptions))
    const { isoFormat } = options
    delete options.isoFormat

    $element.on('dp.change', function(event) {
      if (ngModelCtrl) {
        return $timeout(function() {
          if (!_.isNil(event.date) && (event.date._d !== undefined)) {
            ngModelCtrl.$setViewValue(moment.utc(event.date._d).format(isoFormat))
            return ngModelCtrl.$setValidity('dateFormat', agDate.isValid(ngModelCtrl.$modelValue, isoFormat))
          } else {
            return ngModelCtrl.$setViewValue('')
          }
        })
      }
    }).datetimepicker(options)

    this.ngModelCtrl.$render = () => {
      this.value = moment.utc(this.ngModelCtrl.$viewValue, isoFormat)
      // const datepicker = $element.data('DateTimePicker')
      // if (datepicker) this.value = datepicker.date(this.value)
    }
    // const setPickerValue = function() {
    //   let date = null
    //   if (ngModelCtrl.$viewValue) {
    //     date = moment.utc(ngModelCtrl.$viewValue, isoFormat)
    //   }
    //   // const datepicker = $element.data('DateTimePicker')
    //   // if (datepicker) { return datepicker.date(date) }
    //   this.value = moment.utc(ngModelCtrl.$viewValue, isoFormat)
    // }
    // ngModelCtrl.$render = setPickerValue
    // return setPickerValue()
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
