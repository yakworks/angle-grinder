class IndexCtrl
  @$inject = ["$scope", "$log", "$filter", "Users", "pathWithContext", "dialogCrudCtrlMixin", "massUpdateMixin"]
  constructor: ($scope, $log, @$filter, Users, pathWithContext, dialogCrudCtrlMixin, massUpdateMixin) ->
    # Intitially show the search form
    $scope.showSearchForm = true

    # TODO get rid of `pathWithContext` from here
    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"
      # handler for jqGrid errors
      loadError: -> $log.error "loadError", arguments

    dialogCrudCtrlMixin $scope,
      Resource: Users
      gridName: "usersGrid"
      templateUrl: "templates/usersDialog/form.html"

    massUpdateMixin $scope,
      templateUrl: "/templates/users/massUpdateForm.html"
      controller: "users.MassUpdateFormCtrl"
      gridName: "usersGrid"

  gridColumns: ->
    [
      name: "id"
      width: 50
      formatter: "editActionLink"
    ,
      name: "login"
      label: "Login"
      formatter: "editActionLink"
    ,
      name: "name"
      label: "Name"
      formatter: "editActionLink"
    ,
      name: "allowance"
      label: "Allowance"
    ,
      name: "birthday"
      label: "Birthday"
      formatter: (cellVal) => @$filter("date")(cellVal)
    ,
      name: "paid"
      label: "Paid"
    ]

angular.module("angleGrinder")
  .controller("usersDialog.ListCtrl", IndexCtrl)
