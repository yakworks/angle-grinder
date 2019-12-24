/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const app = angular.module("angleGrinder.common");

app.provider("agDateFilter", function() {
  // see https://docs.angularjs.org/api/ng/filter/date
  let defaultFormat = "MMM DD, YYYY";

  // Set the default date format
  // which will be used across the whole application.
  return {
    setDefaultFormat(format) {
      return defaultFormat = format;
    },

    $get: [
      "$filter", "IsFalsyServ",
      ($filter, IsFalsyServ) => (function(date, useTimeZone, format) {
        if (useTimeZone == null) { useTimeZone = false; }
        if (format == null) { format = defaultFormat; }
        if (IsFalsyServ(date)) { return ""; }

        return moment(date).format(format);
      })
    ]
  };
});

//removes timezone and just uses year,month, day
app.filter('localDate', ["IsFalsyServ", "agDate", (IsFalsyServ, agDate) => (function(input) {
  if (IsFalsyServ(input)) { return ""; }
  //ignores the time part
  return moment(input).format(agDate.getViewFormat());
})
]);

//date with time and no timezone formated to the minutes
app.filter('localDateTime', ["IsFalsyServ", IsFalsyServ => (function(input) {
  if (IsFalsyServ(input)) { return ""; }
  return moment(input).format('MM/DD/YYYY h:mma');
})
]);