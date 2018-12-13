gridz = angular.module("angleGrinder.gridz", [
  "ngSanitize"
  "angleGrinder.common"
  "ui.select2"
  "angleGrinder.resources"
  "dndLists"
])

# Globally expose custom formatters for dates and currencies.
# Used by jgGrid for formatting cell values.
gridz.run [
  "$window", "agDateFilter", "agCurrencyFilter", "agLocalDateTimeFilter",
  ($window, agDateFilter, agCurrencyFilter, agLocalDateTimeFilter) ->

    $window.agDateFilter     = agDateFilter
    $window.agLocalDateTimeFilter = agLocalDateTimeFilter
    $window.agCurrencyFilter = agCurrencyFilter

]
