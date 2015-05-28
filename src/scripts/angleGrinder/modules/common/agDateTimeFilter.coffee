app = angular.module "angleGrinder.common"

app.provider "agDateTimeFilter", ->
  # see https://docs.angularjs.org/api/ng/filter/date
  defaultFormat = "DD MMM YYYY HH:mm A"

  # Set the default date format
  # which will be used across the whole application.
  setDefaultFormat: (format) ->
    defaultFormat = format

  $get: [
    "$filter", ($filter) ->

      (date, format = defaultFormat) ->
        $filter("agDate")(date, true,format)

  ]
