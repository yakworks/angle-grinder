class ListCtrl extends BaseCtrl

  @register "exampleApp", "users.ListCtrl"
  @inject "$scope", "usersGrid", "Users", "MassUpdateMixin", "SinglePageCrudCtrlMixin"

  initialize: ->
    @$scope.showGrid = true

    # initialize the grid
    @$scope.gridOptions = @usersGrid()

    @SinglePageCrudCtrlMixin @$scope,
      Resource: @Users
      resourcePath: "/users"
      gridName: "usersGrid"

    @MassUpdateMixin @$scope,
      templateUrl: "/templates/users/massUpdateForm.html"
      controller: "users.MassUpdateFormCtrl"
      gridName: "usersGrid"
