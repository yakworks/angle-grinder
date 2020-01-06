/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common")

// Button which acts as browser's history back button
app.directive("agBackButton", [
  "$window", $window => ({
  restrict: "A",

  link(scope, element) {
    return element.on("click", function(event) {
      event.preventDefault()
      return $window.history.back()
    })
  }
})
])
