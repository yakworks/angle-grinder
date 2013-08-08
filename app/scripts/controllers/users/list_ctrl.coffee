class ListCtrl
  @$inject = ["$scope", "$location", "pathWithContext"]
  constructor: ($scope, $location, pathWithContext) ->

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"
      multiselect: false

    $scope.showItem = (id) ->
      $location.path("/users/#{id}")

    $scope.createItem = ->
      console.log "creating"

    $scope.editItem = (id) ->
      $location.path("/users/#{id}/edit")

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
