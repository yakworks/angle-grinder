app = angular.module("angleGrinder.common")

# Default date format
app.value "agTrimTimeFormat", "YYYY-MM-DD"

#Updates model value to string date without time.
app.directive "agTrimTime", [
  "$filter", "$timeout", "agTrimTimeFormat", ($filter, $timeout, agTrimTimeFormat) ->
    restrict: "A"

    link: (scope, element, attrs) ->
      updater = () ->
        # Custom format uses if attribute ag-trim-time-format exists
        format = attrs.agTrimTimeFormat ? agTrimTimeFormat

        modelElement = if attrs.ngModel then element else element.find "[ng-model='#{attrs.agTrimTime}']"
        ngModelCtrl = angular.element(modelElement).controller('ngModel') if modelElement

        updateModel = () ->
          if ngModelCtrl
            ngModelCtrl.$parsers.push (viewValue) -> $filter("agDate")(viewValue, true, format)

        attrs.$observe("ngModel", updateModel)

        # X-editable data watcher
        if scope.$data
          scope.$watch '$data', (newVal) ->
            if newVal then scope.$data = $filter("agDate")(scope.$data, true, format)
        else if ngModelCtrl
          scope.$watch attrs.agTrimTime, (newVal) ->
            # Set $viewValue manually to invoke $parsers' functions.
            # The cause is not executing without input toggle.
            #if newVal then ngModelCtrl.$setViewValue newVal

      # If directive set on parent element $timeout uses
      # children elements to be loaded
      if not attrs.ngModel then $timeout () -> updater() else updater()
]
