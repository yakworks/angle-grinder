class FormCtrl
  @$inject = ["$scope", "$location", "user"]
  constructor: ($scope, $location, user) ->
    $scope.user = user

    # Performs server side create or update
    $scope.save = (user) ->
      return if $scope.editForm.$invalid

      $scope.saving = true
      $scope.serverValidationErrors = {}

      onSuccess = (user) ->
        $scope.saving = false
        $location.path "/users/#{user.id}"

      onError = (response) ->
        $scope.saving = false

        if response.status is 422
          errors = response.data.errors
          $scope.serverValidationErrors = errors

      user.save success: onSuccess, error: onError

    # Performs server side delete
    $scope.delete = (user) ->
      $scope.deleting = true

      onSuccess = (response) ->
        $scope.deleting = false
        $location.path "/users"

      onError = (response) ->
        $scope.deleting = false

      user.delete success: onSuccess, error: onError

angular.module("angleGrinder")
  .controller("users.FormCtrl", FormCtrl)
