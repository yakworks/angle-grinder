forms = angular.module("angleGrinder.forms")

# Double check delete button
# usage:
#   <ag-delete-button when-confirmed="delete(record)"></ag-delete-button>
#
#   `when-confirmed` function to call when the action was confirmed
forms.directive "agDeleteButton", ->
  restrict: "E"
  replace: true

  scope:
    whenConfirmed: "&"

  controller: [
    "$scope", ($scope) ->
      $scope.confirmation = false

      $scope.showConfirmation = ->
        $scope.confirmation = true

      $scope.doDelete = ->
        $scope.confirmation = false

        # on the second click perform the given action
        promise = $scope.whenConfirmed()

        # disable / enable the button
        $scope.deleting = true
        promise?.finally? -> $scope.deleting = false
  ]

  template: """
    <button type="button"
            class="btn ag-delete-button"
            ng-class="{ true: 'btn-warning', false: 'btn-danger' }[confirmation]"
            ng-disabled="deleting"
            ng-mouseleave="confirmation = false"
            ng-click="confirmation ? doDelete() : showConfirmation()">
      <i class="icon-trash"></i>

      <ng-switch on="confirmation">
        <span ng-switch-default>Delete</span>
        <span ng-switch-when="true">Are you sure?</span>
      </ng-switch>

      <span ng-if="deleting">...</span>
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
  restrict: "E"
  replace: true
  scope: true
  require: "^form"

  link: (scope, element, attrs, form) ->
    scope.submit = ->
      FormCtrl = form.constructor

      markAsSubmitted = (form) ->
        form.$submitted = true

        # iterate through  all nested forms and mark them as submitted
        nestedForms = _.filter(_.values(form), (input) -> input instanceof FormCtrl)
        markAsSubmitted nested for nested in nestedForms

      markAsSubmitted form

  controller: ["$scope", "pendingRequests", ($scope, pendingRequests) ->
    # disable the button if POST, PUT or PATCH request is in progress
    $scope.$watch -> $scope.saving = pendingRequests.for("POST", "PUT", "PATCH")
  ]

  template: """
    <button type="submit" class="btn btn-primary"
            ng-click="submit()"
            ng-disabled="saving"
      <i class="icon-ok icon-white"></i> Save<span ng-show="saving">...</span>
    </button>
  """
