class AgGridDirectiveCtrl

  @$inject = ["$scope", "sampleData", "editDialog"]
  constructor: ($scope, sampleData, editDialog) ->
    data = sampleData(100)

    $scope.gridOptions =
      data: data
      datatype: "local"
      colModel: @gridColumns()

    $scope.createDialog = ->
      newItem = {}
      editDialog.open("/views/partials/item_form.html", newItem, true)
        .then (item) -> data.push(item)

  gridColumns: ->
    [
      name: "id"
      label: "Inv No"
      width: 60
      sorttype: "int"
    ,
      name: "customer.name"
      label: "Customer"
    ,
      name: "invdate"
      label: "Date"
    ,
      name: "note"
      label: "Note"
    ]

controllers = angular.module("angleGrinder.controllers")
controllers.controller("AgGridDirectiveCtrl", AgGridDirectiveCtrl)
