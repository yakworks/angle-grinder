class FormCtrl
  @$inject = ["$scope", "$location", "$q", "user"]
  constructor: ($scope, $location, $q, user) ->
    $scope.user = user

    # Performs server side create or update
    savePromise = user.$promise
    $scope.save = (user) ->
      # Do not perform save/update when the form is invalid
      return if $scope.editForm.$invalid

      onSuccess = (user) ->
        $location.path "/users/#{user.id}"

      onError = (response) ->
        if response.status is 422
          errors = response.data.errors
          $scope.editForm.$serverError = errors[user.resourceName()]

      savePromise = user.$update().then(onSuccess, onError)

    # Performs server side delete
    deletePromise = user.$promise
    $scope.delete = (user) ->
      onSuccess = -> $location.path "/users"
      deletePromise = user.$delete().then(onSuccess)

    $scope.promises = $q.all([savePromise, deletePromise])

angular.module("angleGrinder")
  .controller("users.FormCtrl", FormCtrl)
