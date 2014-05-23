class FormCtrl extends BaseCtrl

  @register "exampleApp", "users.FormCtrl"
  @inject "$scope", "$location", "select2Options", "serverValidationErrorsHandler", "user"

  initialize: ->
    @expose @$scope, "user", "save", "delete"

    # options for the parent user select
    @$scope.userSelectOptions = @select2Options({
      ajax: url: "/api/users"

      # formatters for result and selection
      formatResult: (user) -> "#{user.name} - #{user.info.email}"
      formatSelection: (user) -> "#{user.name} - #{user.info.email}"
    })

  # Performs server side create or update
  save: (form, user) ->
    # Do not perform save/update when the form is invalid
    return if form.$invalid

    onSuccess = (user) =>
      @$location.path "/examples/users/#{user.id}"

    onError = (response) =>
      @serverValidationErrorsHandler(form, response, user.resourceName())

    user.save success: onSuccess, error: onError

  # Performs server side delete
  delete: (user) ->
    onSuccess = -> @$location.path "/examples/users"
    user.delete success: onSuccess
