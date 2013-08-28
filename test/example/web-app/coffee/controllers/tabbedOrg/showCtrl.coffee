class ShowCtrl

  @$inject = ["$scope", "alerts", "org"]
  constructor: ($scope, alerts, org) ->
    $scope.org = org

    # Trigger grid initialization for the given org contacts
    $scope.initGrid = -> $scope.$broadcast "initContactsGrid", org

    $scope.save = (org) ->
      return if $scope.editForm.$invalid

      onSuccess = -> alerts.info("Org address has been updated.")

      onError = (response) ->
        if response.status is 422
          errors = response.data.errors
          $scope.editForm.$serverError = errors.org

      org.save success: onSuccess, error: onError

angular.module("angleGrinder")
  .controller("tabbedOrg.ShowCtrl", ShowCtrl)
