/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common")

app.provider("agDateTimeFilter", function() {
  // see https://docs.angularjs.org/api/ng/filter/date
  let defaultFormat = "DD MMM YYYY HH:mm A"

  // Set the default date format
  // which will be used across the whole application.
  return {
    setDefaultFormat(format) {
      return defaultFormat = format
    },

    $get: [
      "$filter", $filter => (function(date, format) {
      if (format == null) { format = defaultFormat }
      return $filter("agDate")(date, true,format)
    })

    ]
  }
})
