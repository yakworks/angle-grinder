import angular from 'angular'
import filtersModule from './filtersModule'
// import moment from 'moment'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { isFalsy } from '@yakit/core/truthy'

dayjs.extend(utc)

var app = angular.module(filtersModule)

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
        return dayjs(date).format(format)
      }
    ]
  }
})

// removes timezone and just uses year,month, day
app.filter('localDate', ['agDate', (agDate) => function(input) {
  if (isFalsy(input)) { return '' }
  // ignores the time part
  return dayjs(input).format(agDate.getViewFormat())
}])

// date with time and no timezone formated to the minutes
app.filter('localDateTime', () => function(input) {
  if (isFalsy(input)) { return '' }
  return dayjs.utc(input).format('MM/DD/YYYY h:mma')
})
