class FormCtrl

  @$inject = ["$scope", "$location", "serverValidationErrorsHandler", "user"]
  constructor: ($scope, $location, serverValidationErrorsHandler, user) ->
    $scope.user = user

    # options for the parent user select
    $scope.userSelectOptions =
      width: "element"
      initSelection: true # workaround for initial $dirty state
      ajax:
        dataType: "json"
        url: "/api/users"

        data: (term, page) ->
          q: term # search term (query params)
          max: 20, page: page
          sort: "name", order: "asc"

        results: (result, page) ->
          more = page < result.total
          results: result.rows, more: more

      # formatters for result and selection
      formatResult: (user) -> "#{user.name} - #{user.info.email}"
      formatSelection: (user) -> "#{user.name} - #{user.info.email}"

    # Performs server side create or update
    $scope.save = (form, user) ->
      # Do not perform save/update when the form is invalid
      return if form.$invalid

      onSuccess = (user) ->
        $location.path "/examples/users/#{user.id}"

      onError = (response) ->
        serverValidationErrorsHandler(form, response, user.resourceName())

      user.save success: onSuccess, error: onError

    # Performs server side delete
    $scope.delete = (user) ->
      onSuccess = -> $location.path "/examples/users"
      user.delete success: onSuccess

angular.module("exampleApp")
  .controller("users.FormCtrl", FormCtrl)
