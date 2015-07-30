class ListCtrl extends BaseCtrl

  @register "exampleApp", "users.ListCtrl"
  @inject "$scope", "usersGrid", "Users", "massUpdateMixin", "singlePageCrudCtrlMixin"

  initialize: ->
    @$scope.showGrid = true

    # initialize the grid
    @$scope.gridOptions = @usersGrid()

    @singlePageCrudCtrlMixin @$scope,
      Resource: @Users
      resourcePath: "/users"
      gridName: "usersGrid"

    @massUpdateMixin @$scope,
      templateUrl: "/templates/users/massUpdateForm.html"
      controller: "users.MassUpdateFormCtrl"
      gridName: "usersGrid"
