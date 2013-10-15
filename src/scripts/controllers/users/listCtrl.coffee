class ListCtrl
  @$inject = ["$scope", "$location", "$filter", "confirmationDialog", "Users", "pathWithContext", "massUpdateDialog"]
  constructor: ($scope, $location, @$filter, confirmationDialog, Users, pathWithContext, massUpdateDialog) ->

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"
      multiselect: true

    $scope.showItem = (id) ->
      $location.path("/users/#{id}")

    $scope.editItem = (id) ->
      $location.path("/users/#{id}/edit")

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        promise = Users.delete(id: id).$promise
        promise.then (response) ->
          $scope.usersGrid.removeRow(response.id)

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
