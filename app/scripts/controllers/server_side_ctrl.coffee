class ServerSideCtrl

  @$inject = ["$scope", "editDialog", "Users"]
  constructor: ($scope, editDialog, Users) ->
    $scope.gridOptions =
      url: "/api/users"
      colModel: @gridColumns()
      sortname: "id"

    $scope.editDialog = (id) =>
      user = Users.get(id: id)
      editDialog.open("templates/partials/user_form.html", user, "EditRemoteItemCtrl")

    $scope.createDialog = =>
      newItem = new Users()
      editDialog.open("templates/partials/user_form.html", newItem, "EditRemoteItemCtrl")

  gridColumns: ->
    [
      name: "id"
      width: 50
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
    ,
      name: "paid"
      label: "Paid"
    ]

controllers = angular.module("angleGrinder.controllers")
controllers.controller("ServerSideCtrl", ServerSideCtrl)
