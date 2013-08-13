class FormCtrl

  @$inject = ["$scope", "$location", "org"]
  constructor: ($scope, $location, org) ->
    $scope.org = org

    $scope.save = (org) ->
      return if $scope.editForm.$invalid

      $scope.saving = true
      $scope.serverValidationErrors = {}

      onSuccess = (org) ->
        $scope.saving = false
        $location.path "/#{org.id}"

      onError = (response) ->
        $scope.saving = false

        if response.status is 422
          errors = response.data.errors
          $scope.serverValidationErrors = errors

      org.save success: onSuccess, error: onError

angular.module("angleGrinder")
  .controller("org.FormCtrl", FormCtrl)
