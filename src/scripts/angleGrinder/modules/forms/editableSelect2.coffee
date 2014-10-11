forms = angular.module("angleGrinder.forms")

# TODO spec it
forms.directive "editableSelect2", [
  "editableDirectiveFactory", (editableDirectiveFactory) ->
    editableDirectiveFactory
      directiveName: "editableSelect2"

      inputTpl: """
        <input type="hidden" ng-model="$data" />
      """
]
