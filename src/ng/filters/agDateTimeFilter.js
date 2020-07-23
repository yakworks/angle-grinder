import angular from 'angular'
import filtersModule from './filtersModule'

angular.module(filtersModule).provider('agDateTimeFilter', function() {
  // see https://docs.angularjs.org/api/ng/filter/date
  let defaultFormat = 'DD MMM YYYY HH:mm A'

  // Set the default date format
  // which will be used across the whole application.
  return {
    setDefaultFormat(format) {
      return defaultFormat = format
    },

    $get: [
      '$filter', $filter => function(date, format) {
        if (format == null) { format = defaultFormat }
        return $filter('agDate')(date, true, format)
      }

    ]
  }
})
