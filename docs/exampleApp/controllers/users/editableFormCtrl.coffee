class EditableFormCtrl extends BaseCtrl

  @register "exampleApp", "users.editableFormCtrl"
  @inject "$scope", "Select2Options"

  initialize: ->
    @expose @$scope, "hasNotification", "update"

    # create the master copy
    @$scope.master = @$scope.user
    @$scope.user = angular.copy(@$scope.master)

    @$scope.user.roles ?= ["user", "moderator"]

    # options for the parent user select
    @$scope.parentSelectOptions = @Select2Options({
      ajax: url: "/api/users"

      # formatters for result and selection
      formatResult: (user) -> "#{user.name} - #{user.info.email}"
      formatSelection: (user) -> "#{user.name} - #{user.info.email}"
    })

    @$scope.roles = [
      { id: "admin", name: "admin" }
      { id: "user", name: "user" }
      { id: "guest", name: "guest" }
      { id: "moderator", name: "moderator" }
    ]

    @$scope.user.notificationType ?= ""

    @$scope.notificationTypes = [
      { id: "", text: "None" }
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

    # update the master copy
    promise.then (user) =>
      angular.copy(user, @$scope.master)

    # handle server side errors
    promise.catch (response) ->
      if response.status is 422 and angular.isObject(response.data.errors?.user)
        for field, message of response.data.errors.user
          form.$setError(field, message)

    return promise
