class MassUpdateFormCtrl

  @$inject = ["$scope", "massUpdateFormCtrlMixin", "dialog", "Resource", "selectedIds", "grid"]
  constructor: ($scope, massUpdateFormCtrlMixin, dialog, Resource, selectedIds, grid) ->
    $scope.records = timeZone: "UTC"

    massUpdateFormCtrlMixin $scope,
      dialog: dialog
      Resource: Resource
      selectedIds: selectedIds
      grid: grid

angular.module("angleGrinder")
  .controller("org.MassUpdateFormCtrl", MassUpdateFormCtrl)
