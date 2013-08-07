class ListCtrl
  @$inject = ["$scope", "pathWithContext"]
  constructor: ($scope, pathWithContext) ->

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"
      multiselect: false

  gridColumns: ->
    [
      name: "id"
      width: 50
    ,
      name: "login"
      label: "Login"
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

angular.module("angleGrinder")
  .controller("users.ListCtrl", ListCtrl)
