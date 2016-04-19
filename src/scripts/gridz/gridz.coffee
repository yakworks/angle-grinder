gridz = angular.module("angleGrinder.gridz", [
  "ngSanitize"
  "angleGrinder.common"
  "ui.select2"
  "angleGrinder.resources"
])

# Globally expose custom formatters for dates and currencies.
# Used by jgGrid for formatting cell values.
gridz.run [
  "$window", "agDateFilter", "agCurrencyFilter",
  ($window, agDateFilter, agCurrencyFilter) ->

    $window.agDateFilter     = agDateFilter
    $window.agCurrencyFilter = agCurrencyFilter

]