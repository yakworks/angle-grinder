class IndexCtrl

  @$inject = ["$scope", "sampleData", "exampleGrid", "formDialog"]
  constructor: ($scope, sampleData, exampleGrid, formDialog) ->

    # initialize the grid with generated data
    @data = sampleData.generate(100)
    $scope.data = @data

    $scope.gridOptions = exampleGrid(data: @data)
    $scope.otherGridOptions = exampleGrid(data: @data, pager: false)

    $scope.selectedRowsData = []
    $scope.getSelectedRowsData = ->
      ids = $scope.exampleGrid.getSelectedRowIds()
      $scope.selectedRowsData = _.map ids, (id) ->
        $scope.exampleGrid.getRowData(id)

    $scope.editItem = (id) =>
      item = @findItemById(id)
      item.persisted = -> true
      item.save = (callback) -> callback.success(this)

      item.delete = (callback) =>
        this.deleteItemById(id)
        callback.success(this)

      dialogOptions = item: item, grid: $scope.exampleGrid
      formDialog.open("templates/gridExample/form.html", dialogOptions)

    $scope.createItem = =>
      item = {}
      item.persisted = -> false
      item.save = (callback) ->
        generateId = -> new Date().getTime()
        item.id = generateId()
        callback.success(this)

      dialogOptions = item: item, grid: $scope.exampleGrid
      formDialog.open("templates/gridExample/form.html", dialogOptions).result
        .then (item) => @data.push(item)

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

angular.module("exampleApp")
  .controller("gridExample.ListCtrl", IndexCtrl)
