class IndexCtrl extends BaseCtrl

  @register "exampleApp", "gridExample.ListCtrl"
  @inject "$scope", "$q", "sampleData", "exampleGrid", "formDialog"

  initialize: ->
    @expose @$scope, "getSelectedRowsData", "editRecord", "createRecord", "deleteRecord"

    # initialize the grid with generated data
    @data = @sampleData.generate(100)
    @$scope.data = @data

    @$scope.gridOptions = @exampleGrid(data: @data)
    @$scope.otherGridOptions = @exampleGrid(data: @data, pager: false)

    @$scope.selectedRowsData = []

  getSelectedRowsData: ->
    ids = @$scope.exampleGrid.getSelectedRowIds()
    @$scope.selectedRowsData = _.map ids, (id) ->
      @$scope.exampleGrid.getRowData(id)

  editRecord: (id) ->
    record = @findRecordById(id)

    deferred = @$q.defer()
    deferred.resolve(record)

    angular.extend(record, {
      persisted: -> true

      save: -> { $promise: deferred.promise }

      delete: =>
        this.deleteRecordById(id)
        return { $promise: deferred.promise }
    })

    dialogOptions = record: record, grid: @$scope.exampleGrid
    @formDialog.open("/templates/gridExample/form.html", dialogOptions)

  createRecord: ->
    record = {}

    deferred = @$q.defer()
    deferred.resolve(record)

    angular.extend(record, {
      persisted: -> false

      save: ->
        record.id = new Date().getTime()
        { $promise: deferred.promise }
    })

    dialogOptions = record: record, grid: @$scope.exampleGrid
    @formDialog.open("/templates/gridExample/form.html", dialogOptions).result
      .then (record) => @data.push(record)

  deleteRecord: (id) ->
    record = @deleteRecordById(id)
    @$scope.exampleGrid.removeRow(record.id)

  findRecordById: (id) ->
    id = parseInt(id)
    _.find @data, (row) ->
      row.id is id

  deleteRecordById: (id) ->
    row = @findRecordById(id)
    if row?
      @data = _.reject @data, (record) -> record.id is row.id
      return row
