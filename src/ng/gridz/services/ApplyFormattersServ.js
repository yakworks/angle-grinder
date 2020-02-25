import angular from 'angular'
import gridzModule from '../gridzModule'
import _ from 'lodash'

var gridz = angular.module(gridzModule)

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
