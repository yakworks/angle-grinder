app = angular.module "angleGrinder.common"

app.provider "agDateFilter", ->
  # see https://docs.angularjs.org/api/ng/filter/date
  defaultFormat = "MMM DD, YYYY"

  # Set the default date format
  # which will be used across the whole application.
  setDefaultFormat: (format) ->
    defaultFormat = format

  $get: [
    "$filter", "isFalsy",
    ($filter, isFalsy) ->

      (date, useTimeZone = false, format = defaultFormat) ->
        return "" if isFalsy(date)

        if useTimeZone || useTimeZone is not 'false'
          moment(date).format(format)
        else if (date instanceof Date)
            moment.utc([date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]).format(format)
          else
            dateWithoutTZ = date.split("+")[0].split("-")[0]
            moment.utc(dateWithoutTZ).format(format)
  ]
