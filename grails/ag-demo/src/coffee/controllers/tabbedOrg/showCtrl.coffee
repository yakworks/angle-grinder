class ShowCtrl

  @$inject = ["$scope", "$controller", "$location", "alerts", "org"]
  constructor: ($scope, $controller, $location, alerts, org) ->
    $scope.org = org

    $scope.orgTypes = ["company", "organisation"]

    # setup the grid pager
    $scope.currentId = org.id
    $scope.gridPager = $controller "gridPagerCtrlMixin",
      $scope: $scope
      gridName: "grid.org"
      currentId: "currentId"
      path: "/:id"

    $scope.save = (form, org) ->
      return if form.$invalid

      onSuccess = -> alerts.info("Org address has been updated.")

      onError = (response) ->
        if response.status is 422
          errors = response.data.errors
          form.$serverErrors = errors.org

      org.save success: onSuccess, error: onError

angular.module("angleGrinder")
  .controller("tabbedOrg.ShowCtrl", ShowCtrl)
