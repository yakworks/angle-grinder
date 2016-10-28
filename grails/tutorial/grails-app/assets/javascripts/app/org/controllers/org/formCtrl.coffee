class FormCtrl

  @$inject = ["$scope", "$location", "org"]
  constructor: ($scope, $location, org) ->
    $scope.org = org

    $scope.save = (form, org) ->
      return if form.$invalid

      onSuccess = (org) ->
        $location.path "/#{org.id}"

      onError = (response) ->
        if response.status is 422
          errors = response.data.errors
          $scope.editForm.$serverErrors = errors.org

      org.save(success: onSuccess, error: onError)

angular.module("angleGrinder")
  .controller("org.FormCtrl", FormCtrl)
