/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common")

app.directive("agFileUpload", () => ({
  restrict: "A",
  require: "ngModel",

  link(scope, elem, attrs, ctrl) {
    return elem.bind("change", event => scope.$apply(function(self) {
      ctrl.$setViewValue(elem.val())
      ctrl.$render()
      return self[attrs.agFileUpload](event)
    }))
  }
}))
