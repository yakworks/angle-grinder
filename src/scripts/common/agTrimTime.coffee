app = angular.module("angleGrinder.common")

#Updates model value to string date without time.
app.directive "agTrimTime", [
  "$filter",  ($filter) ->
    restrict: "A"

    link: (scope, element, attrs, ctrl) ->
      updateModel = () ->
        elem =
          if attrs.ngModel
            element
          else
            angular.element(element[0].querySelector("[ng-model='#{attrs.agTrimTime}']"))
        ngModelCtrl = elem.controller('ngModel') if elem
        if ngModelCtrl
          ngModelCtrl.$parsers.push (viewValue) ->
            $filter("agDate")(viewValue, false, "YYYY-MM-DD")

      attrs.$observe("ngModel", updateModel)
]