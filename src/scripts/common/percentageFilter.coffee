app = angular.module "angleGrinder.common"

# Percentage filter, based on https://github.com/vpegado/angular-percentage-filter
app.filter "percentage", ->
  (input, decimals, suffix) ->
    decimals = if angular.isNumber(decimals) then decimals else  2
    suffix = suffix || '%'
    if not isFinite(input) or input is 0
      return ''
    else
      return Math.round(input * Math.pow(10, decimals + 2))/Math.pow(10, decimals) + suffix