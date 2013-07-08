class AgGridDirectiveCtrl

  @$inject = ["$scope", "sampleData", "editDialog"]
  constructor: ($scope, sampleData, editDialog) ->
    @data = sampleData(100)
    $scope.data = @data

    $scope.gridOptions =
      data: @data
      datatype: "local"
      colModel: @gridColumns()
      sortname: "id"

    $scope.editDialog = (id) =>
      item = @findItemById(id)
      item.save = (callback) -> callback(this)

      editDialog.open("templates/partials/item_form.html", item)

    $scope.createDialog = =>
      item = {}
      item.save = (fn = ->) ->
        generateId = -> new Date().getTime()
        item.id = generateId()
        fn(this)

      editDialog.open("templates/partials/item_form.html", item)
        .then (item) => @data.push(item)

  findItemById: (id) ->
    for item in @data
      if item.id is parseInt(id)
        return item

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
      name: "invoiceDate"
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
