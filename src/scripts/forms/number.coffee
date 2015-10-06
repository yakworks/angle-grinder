app = angular.module "angleGrinder.forms"

# treat text inputs as numbers without having input type as number
#It will parse the input values using parseFloat so angular controllers can treat the model value as numhers without having to convert it to number each time.

app.directive "agNumber", () ->
  NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/ #borrowed from angularjs

  require: "ngModel"
  restrict: "A"
  link: (scope, elem, attrs, ctrl) ->

    #borrowed logic from angularjs number directive
    ctrl.$parsers.push (value) ->
      empty = ctrl.$isEmpty(value)
      if (empty || NUMBER_REGEXP.test(value))
        if value == "" then return null
        else if empty then return value
        else return parseFloat(value)
      else
        return undefined

    ctrl.$formatters.push (value) ->
      if ctrl.$isEmpty(value) then return "" else return "" + value

