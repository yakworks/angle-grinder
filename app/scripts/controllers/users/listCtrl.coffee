class ListCtrl
  @$inject = ["$scope", "$location", "$filter", "$modal", "confirmationDialog", "Users", "pathWithContext"]
  constructor: ($scope, $location, $filter, $modal, confirmationDialog, Users, pathWithContext) ->
    @$filter = $filter

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

    $scope.massUpdate = ->
      userIds = $scope.usersGrid.getSelectedRowIds()
      return if userIds.length is 0

      $modal.open
        templateUrl: pathWithContext("/templates/users/massUpdateForm.html")
        controller: "users.MassUpdateFormCtrl"
        resolve:
          userIds: -> userIds
          usersGrid: -> $scope.usersGrid

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
