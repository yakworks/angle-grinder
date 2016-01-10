forms = angular.module("angleGrinder.forms")

forms.directive "agSubmitButton", ->
  restrict: "E"
  replace: true
  scope: true
  require: "^form"

  link: (scope, element, attrs, formCtrl) ->
    # Check if submit button is in the modal window
    # used to disable submit button while modal closing
    isModalWindow = element[0].offsetParent.hasAttribute("modal-window") if element[0].offsetParent?
    isSaving = -> formCtrl.$saving
    scope.$watch isSaving, (saving) ->
      scope.saving = saving if not (isModalWindow and scope.saving)

  template: """
    <button type="submit" class="btn btn-primary"
            ng-disabled="saving">
      <i class="icon-ok icon-white"></i> Save<span ng-show="saving">...</span>
    </button>
  """
