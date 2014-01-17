class IndexCtrl
  @$inject = ["$scope", "$log", "$filter", "Users", "dialogCrudCtrlMixin", "massUpdateMixin"]
  constructor: ($scope, $log, @$filter, Users, dialogCrudCtrlMixin, massUpdateMixin) ->
    # Intitially hide the search form
    $scope.showSearchForm = false

    # TODO create a service for grid options
    $scope.gridOptions =
      path: "/api/users"
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"
      # handler for jqGrid errors
      loadError: -> $log.error "loadError", arguments

    dialogCrudCtrlMixin $scope,
      Resource: Users
      gridName: "usersGrid"
      templateUrl: "templates/examples/usersDialog/form.html"

    massUpdateMixin $scope,
      templateUrl: "/templates/examples/users/massUpdateForm.html"
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
      name: "info.email"
      label: "Email"
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

angular.module("angleGrinder.examples")
  .controller("usersDialog.ListCtrl", IndexCtrl)
