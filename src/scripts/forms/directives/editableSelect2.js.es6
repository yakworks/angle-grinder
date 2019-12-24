/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const forms = angular.module("angleGrinder.forms");

// TODO spec it
forms.directive("editableSelect2", [
  "editableDirectiveFactory", editableDirectiveFactory => editableDirectiveFactory({
  directiveName: "editableSelect2",

  inputTpl: `\
<input type="hidden" ng-model="$data" />\
`
})
]);
