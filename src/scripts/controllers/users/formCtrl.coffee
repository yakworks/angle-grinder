class FormCtrl
  @$inject = ["$scope", "$location", "serverValidationErrorsHandler", "user"]
  constructor: ($scope, $location, serverValidationErrorsHandler, user) ->
    $scope.user = user

    # Performs server side create or update
    $scope.save = (user) ->
      # Do not perform save/update when the form is invalid
      return if $scope.userForm.$invalid

      onSuccess = (user) ->
        $location.path "/examples/users/#{user.id}"

      onError = (response) ->
        serverValidationErrorsHandler($scope.userForm, response, user.resourceName())

      user.save success: onSuccess, error: onError

    # Performs server side delete
    $scope.delete = (user) ->
      onSuccess = -> $location.path "/examples/users"
      user.delete success: onSuccess

angular.module("angleGrinder")
  .controller("users.FormCtrl", FormCtrl)
