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

        moment(date).format(format)
  ]

#removes timezone and just uses year,month, day
app.filter 'localDate', ["isFalsy", "agDate", (isFalsy, agDate) ->
  (input) ->
    return "" if isFalsy(input)
    #ignores the time part
    moment(input).format(agDate.getViewFormat())
]

#date with time and no timezone formated to the minutes
app.filter 'localDateTime', ["isFalsy", (isFalsy) ->
  (input) ->
    return "" if isFalsy(input)
    moment(input).format('MM/DD/YYYY h:mma')
]