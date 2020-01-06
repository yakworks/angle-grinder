/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common")

// Percentage filter, based on https://github.com/vpegado/angular-percentage-filter
app.filter("percentage", () => (function(input, decimals, suffix) {
  decimals = angular.isNumber(decimals) ? decimals :  2
  suffix = suffix || '%'
  if (!isFinite(input) || (input === "")) {
    return ''
  } else {
    return (Math.round(input * Math.pow(10, decimals + 2))/Math.pow(10, decimals)) + suffix
  }
}))
