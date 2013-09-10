class UsersListCtrl
  @$inject = ["$scope", "$log", "$dialog", "$filter", "confirmationDialog", "editDialog", "Users", "pathWithContext"]
  constructor: ($scope, $log, $dialog, @$filter, confirmationDialog, editDialog, Users, pathWithContext) ->
    # intitially show the form
    $scope.showSearchForm = true

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"

    $scope.editItem = (id) ->
      promise = Users.get(id: id).$promise
      editDialog.open(pathWithContext("templates/partials/userForm.html"), promise)

    $scope.createItem = ->
      user = new Users()
      editDialog.open(pathWithContext("templates/partials/userForm.html"), user)

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        user = new Users(id: id)
        user.delete
          success: (response) -> $scope.$broadcast "itemDeleted", response
          error: (response) -> $log.error "Something went wront", response

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
