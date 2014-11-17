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
      <i class="fa fa-trash"></i>

      <ng-switch on="confirmation">
        <span ng-switch-default>Delete</span>
        <span ng-switch-when="true">Are you sure?</span>
      </ng-switch>

      <span ng-if="deleting">...</span>
    </button>
  """
