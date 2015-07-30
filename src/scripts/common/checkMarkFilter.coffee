app = angular.module "angleGrinder.common"

# Filter for boolean values, presents '✓' or '✘'
app.filter "checkMark", ->
  (input, options = {}) ->
    if input
      return "" if options.hideTruth
      return "\u2713"
    else
      return "" if options.hideFalse
      return "\u2718"
