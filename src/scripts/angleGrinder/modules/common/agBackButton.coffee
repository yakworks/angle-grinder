app = angular.module "angleGrinder.common"

# Button which acts as browser's history back button
app.directive "agBackButton", [
  "$window", ($window) ->
    restrict: "A"

    link: (scope, element) ->
      element.on "click", (event) ->
        event.preventDefault()
        $window.history.back()
]
