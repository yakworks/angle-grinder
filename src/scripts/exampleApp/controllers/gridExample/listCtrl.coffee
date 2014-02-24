class IndexCtrl

  @$inject = ["$scope", "sampleData", "exampleGrid", "editDialog"]
  constructor: ($scope, sampleData, exampleGrid, editDialog) ->

    # initialize the grid with generated data
    @data = sampleData.generate(100)
    $scope.data = @data

    $scope.gridOptions = exampleGrid(data: @data)
    $scope.otherGridOptions = exampleGrid(data: @data, pager: false)

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

      editDialog.open("templates/gridExample/form.html", item, $scope.exampleGrid)
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
