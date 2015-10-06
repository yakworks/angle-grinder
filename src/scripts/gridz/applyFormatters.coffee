gridz = angular.module "angleGrinder.gridz"

# Iterates through all columns and replaces formatters placeholders
# with the corresponding methods.
gridz.value "applyFormatters", (colModel, formatters = {}) ->
  _.map colModel, (column) ->
    return unless angular.isString(column.formatter)

    formatter = formatters[column.formatter]
    column.formatter = formatter if formatter?
