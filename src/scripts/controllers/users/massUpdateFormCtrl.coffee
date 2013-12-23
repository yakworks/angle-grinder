angular.module("angleGrinder")

class MassUpdateFormCtrl

  @$inject = ["$scope", "massUpdateFormCtrlMixin", "$modalInstance", "Users", "selectedIds", "grid"]
  constructor: ($scope, massUpdateFormCtrlMixin, $modalInstance, Users, selectedIds, grid) ->

    massUpdateFormCtrlMixin $scope,
      modalInstance: $modalInstance
      Resource: Users
      selectedIds: selectedIds
      grid: grid

    # Assign default value for all records
    $scope.records = allowance: 0

angular.module("angleGrinder.examples")
  .controller("users.MassUpdateFormCtrl", MassUpdateFormCtrl)
