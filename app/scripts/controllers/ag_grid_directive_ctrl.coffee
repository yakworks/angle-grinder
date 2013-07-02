class AgGridDirectiveCtrl

  @$inject = ["$scope", "sampleData", "editDialog"]
  constructor: ($scope, sampleData, editDialog) ->
    @data = sampleData(100)
    $scope.data = @data

    $scope.gridOptions =
      data: @data
      datatype: "local"
      colModel: @gridColumns()

    $scope.editDialog = (id) =>
      item = @findItemById(id)
      editDialog.open("/views/partials/item_form.html", item, false)

    $scope.createDialog = =>
      newItem = {}
      editDialog.open("/views/partials/item_form.html", newItem, true)
        .then (item) => @data.push(item)

  findItemById: (id) ->
    for item in @data
      return item if item.id is parseInt(id)

  gridColumns: ->
    [
      name: "id"
      label: "Inv No"
      width: 60
      sorttype: "int"
    ,
      name: "customer.name"
      label: "Customer"
      formatter: "editActionLink"
    ,
      name: "invdate"
      label: "Date"
    ,
      name: "note"
      label: "Note"
    ,
      name: "complete"
      label: "Complete"
    ]

controllers = angular.module("angleGrinder.controllers")
controllers.controller("AgGridDirectiveCtrl", AgGridDirectiveCtrl)
