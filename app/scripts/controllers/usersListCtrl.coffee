class UsersListCtrl
  @$inject = ["$scope", "$log", "$filter", "confirmationDialog", "editDialog", "Users", "pathWithContext"]
  constructor: ($scope, $log, @$filter, confirmationDialog, editDialog, Users, pathWithContext) ->
    # Intitially show the search form
    $scope.showSearchForm = true

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"

    $scope.editItem = (id) ->
      promise = Users.get(id: id).$promise
      editDialog.open(pathWithContext("templates/partials/userForm.html"), promise, $scope.usersGrid)

    $scope.createItem = ->
      user = new Users()
      editDialog.open(pathWithContext("templates/partials/userForm.html"), user, $scope.usersGrid)

    $scope.deleteItem = (id) ->
      dialogPromise = confirmationDialog.open().result
      dialogPromise.then (confirmed) ->
        return unless confirmed

        promise = Users.delete(id: id).$promise
        promise.then (response) ->
          $scope.usersGrid.removeRow(response.id)

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
  .controller("UsersListCtrl", UsersListCtrl)
