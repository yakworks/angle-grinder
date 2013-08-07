class ListCtrl
  @$inject = ["$scope", "pathWithContext"]
  constructor: ($scope, pathWithContext) ->

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"
      multiselect: false

    $scope.showItem = (id) ->
      console.log "showing id:", id

    $scope.createItem = ->
      console.log "creating"

    $scope.editItem = (id) ->
      console.log "editing id:", id

    $scope.deleteItem = (id) ->
      console.log "deleting id:", id

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
