forms = angular.module("angleGrinder.forms")

forms.directive "agCreateButton", ->
  restrict: "E"
  replace: true
  transclude: true

  compile: (element, attrs, trasclude) ->
    pre: (scope, element) ->
      trasclude scope, (clone) ->
        # Append the default label
        element.append "Create" if $.trim(clone.text()) is ""

  template: """
    <a href="" class="btn">
      <i class="fa fa-pencil-square-o"></i>
      <span ng-transclude></span>
    </a>
  """

forms.directive "agCancelButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="button" class="btn">
      <i class="fa fa-times"></i> Cancel
    </button>
  """
