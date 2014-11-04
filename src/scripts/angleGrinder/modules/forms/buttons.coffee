forms = angular.module("angleGrinder.forms")

forms.directive "agCancelButton", ->
  restrict: "E"
  replace: true

  template: """
    <button type="button" class="btn">
      <i class="icon-remove"></i> Cancel
    </button>
  """
