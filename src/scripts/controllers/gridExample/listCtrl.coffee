class IndexCtrl

  @$inject = ["$scope", "sampleData", "editDialog"]
  constructor: ($scope, sampleData, editDialog) ->
    @data = sampleData.generate(100)
    $scope.data = @data

    # TODO create a service for grid options
    $scope.gridOptions =
      data: @data
      datatype: "local"
      colModel: @gridColumns()
      sortname: "id"
      shrinkToFit: true

    $scope.editItem = (id) =>
      item = @findItemById(id)
      item.persisted = -> true
      item.save = (callback) -> callback.success(this)

      self = this
      item.delete = (callback) ->
        self.deleteItemById(id)
        callback.success(this)

      editDialog.open("templates/gridExample/form.html", item, $scope.exampleGrid)

    $scope.createItem = =>
      item = {}
      item.persisted = -> false
      item.save = (callback) ->
        generateId = -> new Date().getTime()
        item.id = generateId()
        callback.success(this)

      promise = editDialog.open("templates/gridExample/form.html", item, $scope.exampleGrid).result
      promise.then (item) => @data.push(item)

    $scope.deleteItem = (id) =>
      item = @deleteItemById(id)
      $scope.exampleGrid.removeRow(item.id)

  findItemById: (id) ->
    id = parseInt(id)
    _.find @data, (row) ->
      row.id is id

  deleteItemById: (id) ->
    row = @findItemById(id)
    if row?
      @data = _.reject @data, (item) -> item.id is row.id
      return row

  gridColumns: ->
    [
      name: "id"
      label: "Inv No"
      width: 60
      sorttype: "int"
      align: "right"
    ,
      name: "customer.name"
      label: "Customer"
      formatter: "editActionLink"
    ,
      name: "invoiceDate"
      label: "Date"
      width: 80
    ,
      name: "note"
      label: "Note"
    ,
      name: "complete"
      label: "Complete"
      width: 50
      align: "center"
      formatter: "okIcon"
    ]

angular.module("angleGrinder.examples")
  .controller("gridExample.ListCtrl", IndexCtrl)
