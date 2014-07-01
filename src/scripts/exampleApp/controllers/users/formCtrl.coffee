class FormCtrl extends BaseCtrl

  @register "exampleApp", "users.FormCtrl"
  @inject "$scope", "$location", "select2Options", "user"

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
  save: (user) ->
    promise = user.save().$promise

    promise.then (user) =>
      @$location.path "/examples/users/#{user.id}"

    # return both promise and record in order to handle server side error
    # in `agSubmit` directive
    return [promise, user]

  # Performs server side delete
  delete: (user) ->
    onSuccess = -> @$location.path "/examples/users"
    user.delete success: onSuccess
