class FormCtrl
  @$inject = ["$scope", "$location", "user"]
  constructor: ($scope, $location, user) ->
    $scope.user = user
    $scope.serverValidationErrors = {}

    # Performs server side create or update
    $scope.save = (user) ->
      # Do not perform save/update when the form is invalid
      return if $scope.editForm.$invalid

      $scope.serverValidationErrors = {}

      onSuccess = (user) ->
        $location.path "/users/#{user.id}"

      onError = (response) ->
        if response.status is 422
          errors = response.data.errors
          $scope.serverValidationErrors = errors[user.resourceName()]

      user.save success: onSuccess, error: onError

    # Performs server side delete
    $scope.delete = (user) ->
      onSuccess = -> $location.path "/users"
      user.delete success: onSuccess

angular.module("angleGrinder")
  .controller("users.FormCtrl", FormCtrl)
