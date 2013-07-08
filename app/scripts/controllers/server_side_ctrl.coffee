class ServerSideCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->
    $scope.gridOptions =
      url: "/api/users.json"
      colModel: @gridColumns()
      sortname: "id"

  gridColumns: ->
    [
      name: "id"
      width: 50
    ,
      name: "name"
      label: "Name"
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
