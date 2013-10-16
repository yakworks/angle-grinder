angular.module("angleGrinder")

class MassUpdateFormCtrl

  @$inject = ["$scope", "massUpdateFormCtrlMixin", "dialog", "Users", "selectedIds", "grid"]
  constructor: ($scope, massUpdateFormCtrlMixin, dialog, Users, selectedIds, grid) ->
    massUpdateFormCtrlMixin($scope, dialog, Users, selectedIds, grid)

    # Assign default value for all records
    $scope.records = allowance: 0

angular.module("angleGrinder")
  .controller("users.MassUpdateFormCtrl", MassUpdateFormCtrl)
