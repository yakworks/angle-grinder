class ShowCtrl extends BaseCtrl

  @register "exampleApp", "users.ShowCtrl"
  @inject "$scope", "$location", "select2Options", "exampleGrid", "sampleData", "user"

  initialize: ->
    @expose @$scope, "user", "hasNotification", "update", "delete"

    # generate the sample data
    sampleData = @sampleData.generate(100)

    # initialize the grid with generated data
    @$scope.gridOptions = @exampleGrid
      data: sampleData
      shrinkToFit: true
      multiselect: false
      actionPopup: false

    @user.tags ?= ["user", "moderator"]

    # options for the parent user select
    @$scope.parentSelect2Options = @select2Options({
      ajax: url: "/api/users"

      # formatters for result and selection
      formatResult: (user) -> "#{user.name} - #{user.info.email}"
      formatSelection: (user) -> "#{user.name} - #{user.info.email}"
    })

    @$scope.roleSelect2Options =
      "multiple": true
      "simple_tags": true
      "tags": ["admin", "user", "guest", "moderator"]

    @user.notificationType ?= ""

    @$scope.notificationTypes = [
      { id: "", text: "None" }
      { id: "email", text: "Email" }
      { id: "fax", text: "Fax" }
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

  delete: (user) ->
    promise = user.delete().$promise
    promise.then => @$location.path("/examples/users")
