class ShowCtrl extends BaseCtrl

  @register "exampleApp", "users.ShowCtrl"
  @inject "$scope", "$location", "exampleGrid", "sampleData", "user"

  initialize: ->
    @expose @$scope, "user", "delete"

    # generate the sample data
    sampleData = @sampleData.generate(100)

    # initialize the grid with generated data
    @$scope.gridOptions = @exampleGrid
      data: sampleData
      shrinkToFit: true
      multiselect: false
      actionPopup: false

  delete: (user) ->
    promise = user.delete().$promise
    promise.then => @$location.path("/examples/users")
