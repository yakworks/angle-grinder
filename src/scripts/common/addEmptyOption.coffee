# Adds an empty option to select dropdaown.
app = angular.module "angleGrinder.common"

app.directive "addEmptyOption", ->
  restrict: "A"
  link: (scope, element, attrs) ->
    element.append("<option value></option>")
    scope.$watch attrs.ngModel, (newVal, oldVal)->
      #Hide default empty option that appears only when old value was null
      if !newVal
        angular.element(element.find("[value='']")[0]).css("display", "none")
      else
        #Show default empty option to avoid hiding of the element
        angular.element(element.find("[value='']")[0]).css("display", "")
