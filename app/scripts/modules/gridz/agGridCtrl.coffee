gridz = angular.module("angleGrinder.gridz")

# Wrapper for jqGrid public API
# Controller instance could be published to the parent scope
# with `ag-grid-name` directive, for example:
# `<div ag-grid="gridOptions" ag-grid-name="usersGrid"></div>`
gridz.controller "AgGridCtrl", class
  @$inject = ["$scope", "$element", "$q", "hasSearchFilters", "flatten"]
  constructor: ($scope, $element, @$q, @hasSearchFilters, @flatten) ->
    # TODO assign $grid from the directive
    @$grid = $element.find("table.gridz")

  getGridId: ->
    @$grid.attr("id")

  # Gives the currently selected rows when multiselect is set to true.
  # This is a one-dimensional array and the values in the array correspond
  # to the selected id's in the grid.
  getSelectedRowIds: ->
    @getParam("selarrrow")

  # Reloads the grid with the current settings
  reload: (callback = angular.noop) ->
    @$grid.trigger("reloadGrid")
    @$grid.one "jqGridAfterLoadComplete", callback

  # Gets a particular grid parameter
  getParam: (name) ->
    @$grid.getGridParam(name)

  # Sets a particular grid parameter
  setParam: (params) ->
    @$grid.setGridParam(params)

  # Updates the values (using the data array) in the row with rowid.
  # The syntax of data array is: {name1:value1,name2: value2...}
  # where the name is the name of the column as described in the colModel
  # and the value is the new value.
  updateRow: (id, data) ->
    @$grid.setRowData(id, @flatten(data))
    @_flashRow(id)

  # Inserts a new row with id = rowid containing the data in data (an object) at
  # the position specified (first in the table, last in the table or before or after the row specified in srcrowid).
  # The syntax of the data object is: {name1:value1,name2: value2...}
  # where name is the name of the column as described in the colModel and the value is the value.
  addRow: (id, data, position = "first") ->
    @$grid.addRowData(id, @flatten(data), position)
    @_flashRow(id)

  # Returns `true` if the grid contains a row with the given id
  hasRow: (id) ->
    !!@$grid.getInd(id)

  saveRow: (id, data) ->
    if @hasRow(id)
      @updateRow(id, data)
    else
      @addRow(id, data)

  # Deletes the row with the id = rowid.
  # This operation does not delete data from the server.
  removeRow: (id) ->
    @_flashRow id, => @$grid.delRowData(id)

  # Sets the grid search filters and triggers a reload
  search: (filters) ->
    deferred = @$q.defer()

    params =
      search: @hasSearchFilters(filters)
      postData: filters: JSON.stringify(filters)

    @setParam(params)
    @reload -> deferred.resolve(filters)

    deferred.promise

  # Returns `true` if a columnt with the given id is hidden
  isColumnHidden: (columnId) ->
    column = _.findWhere(@_getColModel(), name: columnId)
    column?.hidden

  # Toggle visibility of a column with the given id
  toggleColumn: (columnId) ->
    showOrHide = if @isColumnHidden(columnId) then "showCol" else "hideCol"
    @$grid.jqGrid(showOrHide, columnId)
    @_triggerResize()

  # Invokes a dialog for choosing and reordering grid's columns
  # see: http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3ajquery_ui_methods#column_chooser
  columnChooser: (options = {}) ->
    # Function which will be called when the user press Ok button
    # inside the column chooser dialog.
    options.done = (perm) =>
      # call `remapColumns` method in order to reorder the columns
      @$grid.jqGrid("remapColumns", perm, true) if perm

      # TODO wrap it into service
      # Store choosed column in the local storage
      choosedColumns = _.map @_getColModel(), (column) ->
        _.pick(column, "name", "hidden")

      window.localStorage.setItem("gridz.#{@getGridId()}.choosedColumns", angular.toJson(choosedColumns))

    @$grid.jqGrid("columnChooser", options)

  # Returns column model for the jqGrid
  # @private
  _getColModel: ->
    @$grid.jqGrid("getGridParam", "colModel")

  # Triggers grid's resize event
  # @private
  # TODO fix grid resizing issues
  # TODO resize after column chooser dialog
  _triggerResize: ->
    @$grid.trigger("resize")

  # Flashes the given row
  _flashRow: (id, complete = angular.noop) ->
    $row = $(@$grid[0].rows.namedItem(id))

    $row.css "background-color", "#DFF0D8"
    $row.delay(100).fadeOut "medium", ->
      $row.css "background-color", ""

    $row.fadeIn "fast", -> complete()
