app = angular.module "angleGrinder.common"

app.provider "agDateFilter", ->
  # see https://docs.angularjs.org/api/ng/filter/date
  defaultFormat = "MMM DD, YYYY"

  # Set the default date format
  # which will be used across the whole application.
  setDefaultFormat: (format) ->
    defaultFormat = format

  $get: [
    "$filter", "IsFalsyServ",
    ($filter, IsFalsyServ) ->

      (date, useTimeZone = false, format = defaultFormat) ->
        return "" if IsFalsyServ(date)

        moment(date).format(format)
  ]

#removes timezone and just uses year,month, day
app.filter 'localDate', ["IsFalsyServ", "agDate", (IsFalsyServ, agDate) ->
  (input) ->
    return "" if IsFalsyServ(input)
    #ignores the time part
    moment(input).format(agDate.getViewFormat())
]

#date with time and no timezone formated to the minutes
app.filter 'localDateTime', ["IsFalsyServ", (IsFalsyServ) ->
  (input) ->
    return "" if IsFalsyServ(input)
    moment(input).format('MM/DD/YYYY h:mma')
]