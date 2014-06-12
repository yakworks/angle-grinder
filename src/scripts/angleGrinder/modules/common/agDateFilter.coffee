app = angular.module "angleGrinder.common"

app.provider "agDateFilter", ->
  # see https://docs.angularjs.org/api/ng/filter/date
  defaultFormat = "mediumDate"

  # Set the default date format
  # which will be used across the whole application.
  setDefaultFormat: (format) ->
    defaultFormat = format

  $get: [
    "$filter", "isFalsy",
    ($filter, isFalsy) ->

      (date, format = defaultFormat) ->
        return "" if isFalsy(date)

        $filter("date")(date, format)

  ]
