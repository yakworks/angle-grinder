gridz = angular.module("angleGrinder.gridz")

# Wrapper for jqGrid public API
# Controller instance could be published to the parent scope
# with `ag-grid-name` directive, for example:
# `<div ag-grid="gridOptions" ag-grid-name="usersGrid"></div>`
gridz.controller "AgGridCtrl", class
  @$inject = ["$rootScope", "$q", "hasSearchFilters", "flatten"]
  constructor: (@$rootScope, @$q, @hasSearchFilters, @flatten) ->

  registerGridElement: (@gridEl) ->

  getGridId: ->
    @gridEl.attr("id")

  # Gives the currently selected rows when multiselect is set to true.
  # This is a one-dimensional array and the values in the array correspond
  # to the selected id's in the grid.
  getSelectedRowIds: ->
    @getParam("selarrrow")

  # Returns an array with data of the requested id = rowid.
  # The returned array is of type name:value, where the name is
  # a name from colModel and the value from the associated column in that row.
  # It returns an empty array if the rowid can not be found.
  getRowData: (rowId = null) ->
    @gridEl.getRowData(rowId)

  # Populates the grid with the given data.
  addJSONData: (data) ->
    # The addJSONData is very old method which uses still expandos
    # to the DOM element of the grid (<table> element).
    @gridEl.get(0).addJSONData(data)

    # broadcasts the AngularJS event
    @$rootScope.$broadcast "gridz:loadComplete", data

  # Reloads the grid with the current settings
  reload: ->
    deferred = @$q.defer()

    unregister = @$rootScope.$on "gridz:loadComplete", (_, data) ->
      deferred.resolve(data)
      unregister()

    @gridEl.trigger("reloadGrid")

    deferred.promise

  # Gets a particular grid parameter
  getParam: (name) ->
    @gridEl.getGridParam(name)

  # Sets the given grid parameter
  setParam: (params) ->
    @gridEl.setGridParam(params)

  # Updates the values (using the data array) in the row with rowid.
  # The syntax of data array is: {name1:value1,name2: value2...}
  # where the name is the name of the column as described in the colModel
  # and the value is the new value.
  updateRow: (id, data) ->
    flatData = @flatten(data)

    prevData = @getRowData(id)
    if prevData?
      # retrieve a list of removed keys
      diff = _.difference(_.keys(prevData), _.keys(flatData))

      # filter out rescticted (private) columns like `-row_action_col`
      restictedColumns = (key) -> not key.match /^-/
      diff = diff.filter(restictedColumns)

      # set empty values
      flatData[key] = null for key in diff

    @gridEl.setRowData(id, flatData)
    @flashOnSuccess(id)

  # Inserts a new row with id = rowid containing the data in data (an object) at
  # the position specified (first in the table, last in the table or before or after the row specified in srcrowid).
  # The syntax of the data object is: {name1:value1,name2: value2...}
  # where name is the name of the column as described in the colModel and the value is the value.
  addRow: (id, data, position = "first") ->
    @gridEl.addRowData(id, @flatten(data), position)
    @$rootScope.$broadcast "gridz:rowAdded", id, data
    @flashOnSuccess(id)

  # Returns `true` if the grid contains a row with the given id
  hasRow: (id) ->
    !!@gridEl.getInd(id)

  # Returns an array of the id's in the current grid view.
  # It returns an empty array if no data is available.
  getIds: ->
    @gridEl.getDataIDs()

  # Returns the current page
  getCurrentPage: ->
    @getParam "page"

  # Returns the total number of records
  getTotalRecords: ->
    @getParam "records"

  # Returns the number of rows per page
  getPageSize: ->
    @getParam "rowNum"

  # Returns the total number of pages
  getTotalPages: ->
    Math.ceil @getTotalRecords() / @getPageSize()

  # return true if the current grid view displays the first page
  isFirstPage: ->
    page = @getCurrentPage()
    return page is 1

  # return true if the current grid view displays the last page
  isLastPage: ->
    page = @getCurrentPage()
    return page is @getTotalPages()

  # Loads the previous page
  prevPage: ->
    return @lastPage() if @isFirstPage()

    page = @getCurrentPage()
    @loadPage(page - 1)

  # Loads the next page
  nextPage: ->
    return @firstPage() if @isLastPage()

    page = @getCurrentPage()
    @loadPage(page + 1)

  # Loads the first page
  firstPage: -> @loadPage(1)

  # Loads the last page
  lastPage: -> @loadPage(@getTotalPages())

  # Load the specific page
  loadPage: (page) ->
    @setParam page: page
    @reload()

  saveRow: (id, data) ->
    if @hasRow(id)
      @updateRow(id, data)
    else
      @addRow(id, data)

  # Deletes the row with the id = rowid.
  # This operation does not delete data from the server.
  removeRow: (id) ->
    @flashOnSuccess id, => @gridEl.delRowData(id)

  # Sets the grid search filters and triggers a reload
  search: (filters) ->
    deferred = @$q.defer()

    params =
      search: @hasSearchFilters(filters)
      postData: filters: JSON.stringify(filters)

    @setParam(params)

    promise = @reload()
    promise.then -> deferred.resolve(filters)

    deferred.promise

  # Returns `true` if a columnt with the given id is hidden
  isColumnHidden: (columnId) ->
    column = _.findWhere(@getParam("colModel"), name: columnId)
    column?.hidden

  # Toggle visibility of a column with the given id
  toggleColumn: (columnId) ->
    showOrHide = if @isColumnHidden(columnId) then "showCol" else "hideCol"
    @gridEl.jqGrid(showOrHide, columnId)
    @_triggerResize()

  # Invokes a dialog for choosing and reordering grid's columns
  # see: http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3ajquery_ui_methods#column_chooser
  columnChooser: (options = {}) ->
    # Function which will be called when the user press Ok button
    # inside the column chooser dialog.
    options.done = (perm) =>
      # call `remapColumns` method in order to reorder the columns
      @gridEl.jqGrid("remapColumns", perm, true) if perm

      # TODO wrap it into service
      # Store choosed column in the local storage
      choosedColumns = _.map @_getColModel(), (column) ->
        _.pick(column, "name", "hidden")

      window.localStorage.setItem("gridz.#{@getGridId()}.choosedColumns", angular.toJson(choosedColumns))

    @gridEl.jqGrid("columnChooser", options)

  # Triggers grid's resize event
  # @private
  # TODO fix grid resizing issues
  # TODO resize after column chooser dialog
  _triggerResize: ->
    @gridEl.trigger("resize")

  # Flash the given row
  flashOnSuccess: (id, complete = angular.noop) ->
    @_flashRow(id, "#DFF0D8", complete)

  # Flash the row with red background
  flashOnError: (id, complete = angular.noop) ->
    @_flashRow(id, "#FF0000", complete)

  _flashRow: (id, color = "#DFF0D8", complete = angular.noop) ->
    rowEl = $(@gridEl[0].rows.namedItem(id))

    rowEl.css "background-color", color
    rowEl.delay(250).fadeOut "medium", ->
      rowEl.css "background-color", ""

    rowEl.fadeIn "fast", -> complete()
