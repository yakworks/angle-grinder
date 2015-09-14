forms = angular.module("angleGrinder.forms")

forms.directive "agSubmitButton", ->
  restrict: "E"
  replace: true
  scope: true
  require: "^form"

  link: (scope, element, attrs, formCtrl) ->
    isSaving = -> formCtrl.$saving
    scope.$watch isSaving, (saving) ->
      scope.saving = saving

  template: """
    <button type="submit" class="btn btn-primary"
            ng-disabled="saving">
      <i class="fa fa-check fa-inverse"></i> Save<span ng-show="saving">...</span>
    </button>
  """
