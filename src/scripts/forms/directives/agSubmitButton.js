/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var forms = angular.module("angleGrinder.forms")

forms.directive("agSubmitButton", () => ({
  restrict: "E",
  replace: true,
  scope: true,
  require: "^form",

  link(scope, element, attrs, formCtrl) {
    // Check if submit button is in the modal window
    // used to disable submit button while modal closing
    let isModalWindow
    if (!_.isNil(element[0].offsetParent)) { isModalWindow = element[0].offsetParent.hasAttribute("modal-window") }
    const isSaving = () => formCtrl.$saving
    scope.$watch(isSaving, function(saving) {
      if (!(isModalWindow && scope.saving)) { return scope.saving = saving }
    })

    return scope.text = attrs.text || "Save"
  },

  template: `\
<button type="submit" class="btn btn-default btn-primary"
        ng-disabled="saving">
  <i class="fa fa-check fa-inverse"></i> {{text}}<span ng-show="saving">...</span>
</button>\
`
}))
