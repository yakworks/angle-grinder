forms = angular.module("angleGrinder.forms")

# Double check delete button
# usage:
#   <ag-delete-button when-confirmed="delete(item)" deleting="deleting"></ag-delete-button>
#
#   `when-confirmed` function to call when the action was confirmed
#   `deleting` when it's set to `true` the button will be disabled
forms.directive "agDeleteButton", ->
  restrict: "E"
  replace: true

  scope:
    whenConfirmed: "&"
    promise: "="

  controller: [
    "$scope", "$element", ($scope, $element) ->
      $scope.confirmation = false

      $scope.delete = ->
        # on the second click perform the given action
        $scope.whenConfirmed() if $scope.confirmation
        # switch the state
        $scope.confirmation = !$scope.confirmation

      # change button label
      $scope.$watch "confirmation", (confirmation) ->
        $scope.label = unless confirmation then "Delete" else "Are you sure?"

        if confirmation
          $element.removeClass "btn-danger"
          $element.addClass "btn-warning"
        else
          $element.addClass "btn-danger"
          $element.removeClass "btn-warning"
  ]

  template: """
    <button type="button" class="btn btn-danger ag-delete-button" ng-disabled="!promise"
            ng-mouseleave="confirmation = false"
            ng-click="delete()">
      <i class="icon-trash"></i> {{label}}<span ng-hide="promise">...</span>
    </button>
  """

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
      <i class="icon-edit"></i>
      <span ng-transclude></span>
    </a>
  """

forms.directive "agCancelButton", ->
  restrict: "E"
  replace: true
  template: """
    <button type="button" class="btn">
      <i class="icon-remove"></i> Cancel
    </button>
  """

forms.directive "agSubmitButton", ->
  restrict: "E" # TODO change it to the attribute
  replace: true
  require: "^form"
  scope: promise: "=" # TODO if promise is not set it's always enabled
  # TODO aility to set multiple promises

  link: ($scope, element, attrs, form) ->
    $scope.submit = -> form.$submitted = true

  template: """
    <button type="submit" class="btn btn-primary"
            ng-click="submit()"
            ng-disabled="!promise"
      <i class="icon-ok icon-white"></i> Save<span ng-show="!promise">...</span>
    </button>
  """
