/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Adds an empty option to select dropdaown.
var app = angular.module("angleGrinder.common");

app.directive("addEmptyOption", () => ({
  restrict: "A",

  scope: {
    addEmptyOption: "="
  },

  link(scope, element, attrs) {
    const emptyOption = !_.isNil(attrs.emptyOption) ? JSON.parse(attrs.emptyOption.replace(/[']/g, "\"")) : {id: "", name:""};
    element.prepend(angular.element(`<option value=''>${emptyOption.name}</option>`));
    if (!_.isNil(scope.addEmptyOption) && (scope.addEmptyOption.length > 0)) {
      if (!_.find(scope.addEmptyOption, {id: emptyOption.id})) { return scope.addEmptyOption.unshift(emptyOption); }
    }
  }
}));
