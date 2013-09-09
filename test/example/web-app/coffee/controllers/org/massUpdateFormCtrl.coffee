class MassUpdateFormCtrl

  @$inject = ["$scope", "Resource", "orgIds", "dialog", "orgGrid"]
  constructor: ($scope, Resource, orgIds, dialog, orgGrid) ->
    $scope.orgs = timeZone: "UTC"

    $scope.save = (orgs) ->
      return if $scope.orgsForm.$invalid

      promise = Resource.massUpdate(ids: orgIds, data: orgs).$promise
      promise.then ->
        orgGrid.reloadGrid()
        $scope.closeDialog()

    $scope.closeDialog = ->
      dialog.close()

angular.module("angleGrinder")
  .controller("org.MassUpdateFormCtrl", MassUpdateFormCtrl)
