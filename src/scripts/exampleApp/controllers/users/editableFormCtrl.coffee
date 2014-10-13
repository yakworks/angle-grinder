class EditableFormCtrl extends BaseCtrl

  @register "exampleApp", "users.editableFormCtrl"
  @inject "$scope", "select2Options"

  initialize: ->
    @expose @$scope, "hasNotification", "update"

    @$scope.user.tags ?= ["user", "moderator"]

    # options for the parent user select
    @$scope.parentSelectOptions = @select2Options({
      ajax: url: "/api/users"

      # formatters for result and selection
      formatResult: (user) -> "#{user.name} - #{user.info.email}"
      formatSelection: (user) -> "#{user.name} - #{user.info.email}"
    })

    @$scope.roleSelectOptions =
      "multiple": true
      "simple_tags": true
      "tags": ["admin", "user", "guest", "moderator"]

    @$scope.user.notificationType ?= ""

    @$scope.notificationTypes = [
      { id: "", text: "None" }<
      { id: "email", text: "Email" }
      { id: "fax", text: "Fax" }
      { id: "paper", text: "Paper" }
    ]

  hasNotification: (form, user, type) ->
    if form.$visible
      return form.notificationType.$modelValue is type
    else
      return user.notificationType is type

  update: (user, form) ->
    promise = user.$update()
    promise.catch (response) ->
      # handle server side errors
      if response.status is 422 and angular.isObject(response.data.errors?.user)
        for field, message of response.data.errors.user
          form.$setError(field, message)

    return promise
