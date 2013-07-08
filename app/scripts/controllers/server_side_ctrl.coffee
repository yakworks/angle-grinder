class ServerSideCtrl

  @$inject = ["$scope", "editDialog", "Users"]
  constructor: ($scope, editDialog, Users) ->
    $scope.gridOptions =
      url: "/api/users"
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"

    $scope.editDialog = (id) ->
      user = Users.get(id: id)
      editDialog.open("templates/partials/user_form.html", user)

    $scope.createDialog = ->
      user = new Users()
      editDialog.open("templates/partials/user_form.html", user)

    $scope.deleteItem = (id) ->
      user = new Users(id: id)
      user.$delete -> $scope.$broadcast "itemDeleted"

  gridColumns: ->
    [
      name: "id"
      width: 50
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
    ,
      name: "paid"
      label: "Paid"
    ]

controllers = angular.module("angleGrinder.controllers")
controllers.controller("ServerSideCtrl", ServerSideCtrl)
