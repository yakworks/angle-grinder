/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common")

// Enhanced bind directive with default value
// Should be used with xeditable fields to show data in the view mode
app.directive("agBind", function() {
  return {
    restrict: "A",

    controller() {

      this.showValue = value => angular.isNumber(value) || !!value

      return this
    },

    compile(element) {
      // grab the default value from the initial content
      const defaultValue = element.html() || "&nbsp;"

      return (scope, element, attrs, ctrl) => scope.$watch(attrs.agBind, function(value) {
        const txt = ctrl.showValue(value) ? value : defaultValue
        return element.html(txt)
      })
    }
  }
})
