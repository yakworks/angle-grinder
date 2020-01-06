/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var gridz = angular.module("angleGrinder.gridz", [
  "ngSanitize",
  "angleGrinder.common",
  "ui.select2",
  "angleGrinder.resources",
  "dndLists"
])

// Globally expose custom formatters for dates and currencies.
// Used by jgGrid for formatting cell values.
gridz.run([
  "$window", "agDateFilter", "agCurrencyFilter",
  function($window, agDateFilter, agCurrencyFilter) {

    $window.agDateFilter     = agDateFilter
    return $window.agCurrencyFilter = agCurrencyFilter
  }

])
