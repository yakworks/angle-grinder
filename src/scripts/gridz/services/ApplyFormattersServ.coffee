gridz = angular.module "angleGrinder.gridz"

# Iterates through all columns and replaces formatters placeholders
# with the corresponding methods.
gridz.value "ApplyFormattersServ", (colModel, formatters = {}, unFormatters = {}) ->
  _.map colModel, (column) ->
    return unless angular.isString(column.formatter)
    formName = column.formatter.toString()
    formatter = formatters[column.formatter]
    unformat = unFormatters[column.formatter]
    if formatter?
      column.formatter = formatter
    if unformat?
      column.unformat = unformat
    else
      console.log("For proper work, please add unformatter for #{formName}")
