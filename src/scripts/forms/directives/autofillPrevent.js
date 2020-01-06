/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var forms = angular.module("angleGrinder.forms");

forms.directive("autofillPrevent", [
  "$parse", $parse => ({
  require: "ngModel",

  link(scope, elem, attrs, ngModel) {

    // Binds focus event to element
    elem.bind("focus", () => scope.hasBeenFocused = true);

    // Listen to any changes in view
    return ngModel.$viewChangeListeners.push(function() {
      if (!scope.hasBeenFocused) {
        return $parse(attrs.ngModel).assign(scope, ngModel.$setViewValue(""));
      }
    });
  }
})


]);
