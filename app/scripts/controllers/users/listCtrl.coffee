class ListCtrl
  @$inject = ["$scope", "$location", "$filter", "$dialog", "pathWithContext"]
  constructor: ($scope, $location, @$filter, $dialog, pathWithContext) ->

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

    $scope.massUpdate = ->
      # TODO retrive list of selected rows (backport the controller for the grid)
      userIds = $("table.gridz").getGridParam("selarrrow")
      return if userIds.length is 0

      dialog = $dialog.dialog
        backdropFade: false
        dialogFade: false
        resolve: userIds: -> userIds

      dialog.open(pathWithContext("/templates/users/massUpdateForm.html"), "users.MassUpdateFormCtrl")

  gridColumns: ->
    showActionLink = (cellVal, options, rowdata) ->
      """
      <a href="#/users/#{rowdata.id}">#{cellVal}</a>
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
