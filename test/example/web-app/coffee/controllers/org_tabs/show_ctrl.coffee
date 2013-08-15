class ShowCtrl

  @$inject = ["$scope", "$location", "pathWithContext", "alerts", "org"]
  constructor: ($scope, $location, pathWithContext, alerts, org) ->
    $scope.org = org

    $scope.initGrid = =>
      $scope.gridOptions =
        url: pathWithContext("/org/listContacts/#{org.id}.json")
        colModel: [
          { name: "id", label: "ID", width: 30 }
          { name: "firstName", label: "First name", width: 50 }
          { name: "lastName", label: "Last name", width: 50 }
          { name: "email", label: "Email", width: 70, formatter: "email" }
        ]
        multiselect: false # turn off multiselect
        shrinkToFit: true # makes columns fit to width
        autowidth: true
        sortname: "email"
        sortorder: "asc"

    $scope.save = (org) ->
      return if $scope.editForm.$invalid

      onSuccess = -> alerts.info("Org address has been updated.")

      onError = (response) ->
        if response.status is 422
          errors = response.data.errors
          $scope.serverValidationErrors = errors.org

      org.save success: onSuccess, error: onError

    $scope.delete = (org) ->
      onSuccess = -> $location.path("/")
      org.delete success: onSuccess

angular.module("angleGrinder")
  .controller("orgTabs.ShowCtrl", ShowCtrl)
