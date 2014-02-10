class MassUpdateFormCtrl

  @$inject = ["$scope", "massUpdateFormCtrlMixin", "dialog", "Users", "selectedIds", "grid"]
  constructor: ($scope, massUpdateFormCtrlMixin, dialog, Users, selectedIds, grid) ->

    massUpdateFormCtrlMixin $scope,
      dialog: dialog
      Resource: Users
      selectedIds: selectedIds
      grid: grid

    # Assign default value for all records
    $scope.records = allowance: 0

angular.module("exampleApp")
  .controller("users.MassUpdateFormCtrl", MassUpdateFormCtrl)
