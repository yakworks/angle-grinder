class ListCtrl
  @$inject = ["$scope", "$filter", "Users", "pathWithContext", "massUpdateDialog", "singlePageCrudCtrlMixin"]
  constructor: ($scope, @$filter, Users, pathWithContext, massUpdateDialog, singlePageCrudCtrlMixin) ->

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"
      multiselect: true

    singlePageCrudCtrlMixin $scope,
      Resource: Users
      resourcePath: "/users"
      gridName: "usersGrid"

    # TODO replace it with the mixin concept
    $scope.massUpdate = massUpdateDialog(
      grid: -> $scope.usersGrid
      templateUrl: -> "/templates/users/massUpdateForm.html"
      controller: -> "users.MassUpdateFormCtrl"
    )

  gridColumns: ->
    showActionLink = (cellVal, options, rowdata) ->
      """
      <a href="#/examples/users/#{rowdata.id}">#{cellVal}</a>
      """

    [
      name: "id"
      width: 50
      formatter: showActionLink
    ,
      name: "login"
      label: "Login"
      formatter: showActionLink
    ,
      name: "name"
      label: "Name"
      formatter: showActionLink
    ,
      name: "allowance"
      label: "Allowance"
    ,
      name: "birthday"
      label: "Birthday",
      formatter: (cellVal) => @$filter("date")(cellVal)
    ,
      name: "paid"
      label: "Paid"
    ]

angular.module("angleGrinder")
  .controller("users.ListCtrl", ListCtrl)
