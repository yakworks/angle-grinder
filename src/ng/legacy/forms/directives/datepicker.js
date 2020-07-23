import angular from 'angular'
import formsModule from '../formsModule'
import moment from 'moment'

var forms = angular.module(formsModule)

forms.provider('agDate', function() {
  let viewFormat = 'MM/DD/YYYY'

  let date = 'YYYY-MM-DDTHH:mmZ'
  let localDateTime = 'YYYY-MM-DDTHH:mm'
  let localDate = 'YYYY-MM-DD'

  return {
    setViewFormat(format) {
      return viewFormat = format
    },

    setLocalDateFormat(format) {
      return localDate = format
    },

    setLocalDateTimeFormat(format) {
      return localDateTime = format
    },

    setDateFormat(format) {
      return date = format
    },

    $get: [
      () => ({
        getViewFormat() {
          return viewFormat
        },

        getIsoFormat(name) {
          switch (name) {
            case 'date': return date
            case 'localDateTime': return localDateTime
            default: return localDate
          }
        },

        isValid(value, format) {
          return moment(value, format, true).isValid()
        }
      })
    ]
  }
})

forms.directive('agDate', [
  'agDate', agDate => ({
    restrict: 'AE',
    require: '?ngModel',

    link(scope, element, attrs, ngModelCtrl) {
      const modelFormat = agDate.getIsoFormat(attrs.dateType)
      const dateFormat = attrs.dateFormat || agDate.getViewFormat()

      ngModelCtrl.$parsers.shift()
      ngModelCtrl.$parsers.push(function(viewValue) {
        const isValid = agDate.isValid(viewValue, dateFormat)
        ngModelCtrl.$setValidity('dateFormat', isValid)
        if (isValid) {
          return moment.utc(viewValue, dateFormat).format(modelFormat)
        } else {
          return ''
        }
      })

      return ngModelCtrl.$formatters.push(function(modelValue) {
        const isValid = agDate.isValid(modelValue, modelFormat)
        ngModelCtrl.$setValidity('dateFormat', isValid)
        return moment.utc(modelValue, modelFormat).format(dateFormat)
      })
    }
  })
])
