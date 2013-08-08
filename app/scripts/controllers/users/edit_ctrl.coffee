class EditCtrl
  @$inject = ["$scope", "$location", "user"]
  constructor: ($scope, $location, user) ->
    $scope.user = user

    $scope.save = (user) ->
      $scope.$broadcast "saving"

      return unless $scope.editForm.$valid

      $scope.saving = true
      $scope.serverValidationErrors = {}

      onSuccess = ->
        $scope.saving = false
        $location.path "/users/#{user.id}"

      onError = (response) ->
        $scope.saving = false

        if response.status is 422
          errors = response.data.errors
          $scope.serverValidationErrors = errors

      user.save success: onSuccess, error: onError

angular.module("angleGrinder")
  .controller("users.EditCtrl", EditCtrl)
