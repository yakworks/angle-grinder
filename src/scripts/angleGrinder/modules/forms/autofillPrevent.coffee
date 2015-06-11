forms = angular.module("angleGrinder.forms")

forms.directive "autofillPrevent", [
  "$parse", ($parse) ->
    require: "ngModel"
    link: (scope, elem, attrs, ngModel) ->

      # Binds focus event to element
      elem.bind "focus", ->
        scope.hasBeenFocused = true

      # Listen to any changes in view
      ngModel.$viewChangeListeners.push ->
        if not scope.hasBeenFocused
          $parse(attrs.ngModel).assign scope, ngModel.$setViewValue ""


]
