import angular from 'angular'
import commonModule from './commonModule'
import moment from 'moment'
import { isFalsy } from '../../scripts/utils/isFalsy'

var app = angular.module(commonModule)

app.provider('agDateFilter', function() {
  // see https://docs.angularjs.org/api/ng/filter/date
  let defaultFormat = 'MMM DD, YYYY'

  // Set the default date format
  // which will be used across the whole application.
  return {
    setDefaultFormat(format) {
      return defaultFormat = format
    },

    $get: [
      '$filter', ($filter) => function(date, useTimeZone, format) {
        if (useTimeZone == null) { useTimeZone = false }
        if (format == null) { format = defaultFormat }
        if (isFalsy(date)) { return '' }
        //console.log("moment(date)", date)
        return moment(date).format(format)
      }
    ]
  }
})

// removes timezone and just uses year,month, day
app.filter('localDate', ['agDate', (agDate) => function(input) {
  if (isFalsy(input)) { return '' }
  // ignores the time part
  return moment(input).format(agDate.getViewFormat())
}])

// date with time and no timezone formated to the minutes
app.filter('localDateTime', () => function(input) {
  if (isFalsy(input)) { return '' }
  return moment.utc(input).format('MM/DD/YYYY h:mma')
})
