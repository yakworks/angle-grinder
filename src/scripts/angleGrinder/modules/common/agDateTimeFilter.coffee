app = angular.module "angleGrinder.common"

app.provider "agDateTimeFilter", ->
  # see https://docs.angularjs.org/api/ng/filter/date
  defaultFormat = "dd MMM yyyy hh:mm a"

  # Set the default date format
  # which will be used across the whole application.
  setDefaultFormat: (format) ->
    defaultFormat = format

  $get: [
    "$filter", ($filter) ->

      (date, format = defaultFormat) ->
        $filter("agDate")(date, format)

  ]
