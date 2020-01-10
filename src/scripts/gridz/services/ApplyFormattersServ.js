/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var gridz = angular.module('angleGrinder.gridz')

// Iterates through all columns and replaces formatters placeholders
// with the corresponding methods.
gridz.value('ApplyFormattersServ', function(colModel, formatters) {
  if (formatters == null) { formatters = {} }
  return _.map(colModel, function(column) {
    if (!angular.isString(column.formatter)) { return }

    const formatter = formatters[column.formatter]
    if (!_.isNil(formatter)) { return column.formatter = formatter }
  })
})
