app = angular.module "angleGrinder.forms"
# Validates text area to have not more then specified number of lines
app.directive "agMaxLines", ["IsFalsyServ", "$parse", (IsFalsyServ, $parse) ->
  require: "ngModel"
  restrict: "A"

  link: (scope, elem, attrs, ngModelCtrl) ->
    validator = (value) ->
      value = if value then value.trim() else value
      maxLines = $parse(attrs.agMaxLines)(scope)
      numLines = (value || '').split("\n").length
      valid = IsFalsyServ(maxLines) ||  numLines <= maxLines
      ngModelCtrl.$setValidity("maxlines", valid)
      return if valid then value else undefined

    ngModelCtrl.$parsers.unshift(validator)
    ngModelCtrl.$formatters.push(validator)

    scope.$watch(attrs.agMaxLines, () ->
      validator(ngModelCtrl.$viewValue)
    )

]
