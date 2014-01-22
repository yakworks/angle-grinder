class ShowCtrl

  @$inject = ["$scope", "alerts", "org"]
  constructor: ($scope, alerts, org) ->
    $scope.org = org

    $scope.save = (form, org) ->
      return if form.$invalid

      onSuccess = -> alerts.info("Org address has been updated.")

      onError = (response) ->
        if response.status is 422
          errors = response.data.errors
          form.$serverError = errors.org

      org.save success: onSuccess, error: onError

angular.module("angleGrinder")
  .controller("tabbedOrg.ShowCtrl", ShowCtrl)
