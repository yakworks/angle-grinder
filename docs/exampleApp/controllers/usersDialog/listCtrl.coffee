class IndexCtrl extends BaseCtrl

  @register "exampleApp", "usersDialog.ListCtrl"
  @inject "$scope", "usersDialogGrid", "Users", "dialogCrudCtrlMixin", "massUpdateMixin"

  initialize: ->
    # Initially hide the search form
    @$scope.showSearchForm = false

    # by default filter by `customers`
    @$scope.defaultFilters = contact: type: "customer"
    @$scope.filters = angular.copy(@$scope.defaultFilters)

    # initialize the grid
    @$scope.gridOptions = @usersDialogGrid()

    @dialogCrudCtrlMixin @$scope,
      Resource: @Users
      gridName: "usersGrid"
      templateUrl: "templates/usersDialog/form.html"

    @massUpdateMixin @$scope,
      templateUrl: "/templates/users/massUpdateForm.html"
      controller: "users.MassUpdateFormCtrl"
      gridName: "usersGrid"
