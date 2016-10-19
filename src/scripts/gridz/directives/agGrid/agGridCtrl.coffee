gridz = angular.module("angleGrinder.gridz")

# Wrapper for jqGrid public API
# Controller instance could be published to the parent scope
# with `ag-grid-name` directive, for example:
# `<div ag-grid="gridOptions" ag-grid-name="usersGrid"></div>`
class AgGridCtrl extends BaseCtrl

  @register gridz, "AgGridCtrl"
  @inject "$rootScope", "$element", "$attrs", "$q", "hasSearchFilters", "FlattenServ", "xlsData", "csvData"

  highlightClass = 'ui-state-highlight'

  getGridEl: ->
    @gridEl or= @$element.find("table.gridz")

  getGridId: ->
    @getGridEl().attr("id")

  # Gives the currently selected rows when multiselect is set to true.
  # This is a one-dimensional array and the values in the array correspond
  # to the selected id's in the grid.
  getSelectedRowIds: ->
    @getParam("selarrrow")

  #Gives selected row objects, [{id:1..}, {id:2..}]
  getSelectedRows: ->
    getRowData = _.bind(@getRowData, @)
    ids = @getSelectedRowIds()
    _.map ids, (id) -> getRowData(id)

  clearSelection: ->
    @getGridEl().jqGrid 'resetSelection'

  # Returns an array with data of the requested id = rowid.
  # The returned array is of type name:value, where the name is
  # a name from colModel and the value from the associated column in that row.
  # It returns an empty array if the rowid can not be found.
  getRowData: (rowId = null) ->
    @getGridEl().getRowData(rowId)

  #Return all rows
  getAllRows: () ->
    @getGridEl().getRowData()

  # Populates the grid with the given data.
  addJSONData: (data) ->
    # The addJSONData is very old method which uses still expandos
    # to the DOM element of the grid (<table> element).
    @getGridEl().get(0).addJSONData(data)

    # broadcasts the AngularJS event
    @$rootScope.$broadcast "gridz:loadComplete", data

  # Reloads the grid with the current settings
  reload: (options=[])->
    deferred = @$q.defer()

    unregister = @$rootScope.$on "gridz:loadComplete", (_, data) ->
      deferred.resolve(data)
      unregister()

    @getGridEl().trigger("reloadGrid", options)

    deferred.promise

  # Gets a particular grid parameter
  getParam: (name) ->
    @getGridEl().getGridParam(name)

  # Sets the given grid parameter
  setParam: (params) ->
    @getGridEl().setGridParam(params)

  # Updates the values (using the data array) in the row with rowid.
  # The syntax of data array is: {name1:value1,name2: value2...}
  # where the name is the name of the column as described in the colModel
  # and the value is the new value.
  updateRow: (id, data) ->
    flatData = @FlattenServ(data)

    prevData = @getRowData(id)
    if prevData?
      # retrieve a list of removed keys
      diff = _.difference(_.keys(prevData), _.keys(flatData))

      # filter out restricted (private) columns like `-row_action_col`
      restrictedColumns = (key) -> not key.match /^-/
      diff = diff.filter(restrictedColumns)

      # set empty values
      flatData[key] = null for key in diff

    @getGridEl().setRowData(id, flatData)
    @flashOnSuccess(id)
    @$rootScope.$broadcast "gridz:rowUpdated", @$attrs.agGrid, id, data

  # Inserts a new row with id = rowid containing the data in data (an object) at
  # the position specified (first in the table, last in the table or before or after the row specified in srcrowid).
  # The syntax of the data object is: {name1:value1,name2: value2...}
  # where name is the name of the column as described in the colModel and the value is the value.
  addRow: (id, data, position = "first") ->
    @getGridEl().addRowData(id, @FlattenServ(data), position)
    @$rootScope.$broadcast "gridz:rowAdded", @$attrs.agGrid, id, data
    @flashOnSuccess(id)

  # Returns `true` if the grid contains a row with the given id
  hasRow: (id) ->
    !!@getGridEl().getInd(id)

  # Returns an array of the id's in the current grid view.
  # It returns an empty array if no data is available.
  getIds: ->
    @getGridEl().getDataIDs()

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
    @flashOnSuccess id, => @getGridEl().delRowData(id)

  # Sets the grid search filters and triggers a reload
  search: (filters) ->
    deferred = @$q.defer()

    params =
      page: 1
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
    @getGridEl().jqGrid(showOrHide, columnId)
    @_triggerResize()

  # Invokes a dialog for choosing and reordering grid's columns
  # see: http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3ajquery_ui_methods#column_chooser
  columnChooser: (options = {}) ->
    # Function which will be called when the user press Ok button
    # inside the column chooser dialog.
    options.done = (perm) =>
      # call `remapColumns` method in order to reorder the columns
      @getGridEl().jqGrid("remapColumns", perm, true) if perm

      # TODO wrap it into service
      # Store chosen column in the local storage
      chosenColumns = _.map @_getColModel(), (column) ->
        _.pick(column, "name", "hidden")

      window.localStorage.setItem("gridz.#{@getGridId()}.chosenColumns", angular.toJson(chosenColumns))

    @getGridEl().jqGrid("columnChooser", options)

  # Returns data uri with xls file content for rows from the current grid view.
  getXlsDataUri: ->
    @xlsData(@getGridId(), @getSelectedRowIds())

  getCsvData: ->
    @csvData(@getGridId(), @getSelectedRowIds())

  # Triggers grid's resize event
  # @private
  # TODO fix grid resizing issues
  # TODO resize after column chooser dialog
  _triggerResize: ->
    @getGridEl().trigger("resize")

  # Flash the given row
  flashOnSuccess: (id, complete = angular.noop) ->
    @_flashRow(id, "#DFF0D8", complete)

  # Flash the row with red background
  flashOnError: (id, complete = angular.noop) ->
    @_flashRow(id, "#FF0000", complete)

  _flashRow: (id, color = "#DFF0D8", complete = angular.noop) ->
    rowEl = $(@getGridEl()[0].rows.namedItem(id))

    rowEl.css "background-color", color
    rowEl.delay(250).fadeOut "medium", ->
      rowEl.css "background-color", ""

    rowEl.fadeIn "fast", -> complete()

  addClass: (id, clazz, animation = true) ->
    rowEl = $(@getGridEl()[0].rows.namedItem(id))

    if not rowEl.hasClass(clazz)
      if animation
        rowEl.delay(250).fadeOut "medium", ->
          rowEl.addClass(clazz)
        rowEl.fadeIn "fast", -> angular.noop()
      else
        rowEl.addClass(clazz)

  removeClass: (id, clazz, animation = true) ->
    rowEl = $(@getGridEl()[0].rows.namedItem(id))

    if rowEl.hasClass(clazz)
      if animation
        rowEl.delay(250).fadeOut "medium", ->
          rowEl.removeClass(clazz)
        rowEl.fadeIn "fast", -> angular.noop()
      else
        rowEl.removeClass(clazz)

  highlightRow: (id) ->
    rowEl = $(@getGridEl()[0].rows.namedItem(id))
    if not rowEl.hasClass(highlightClass)
      rowEl.addClass(highlightClass)

  unHighlightRow: (id) ->
    rowEl = $(@getGridEl()[0].rows.namedItem(id))
    if rowEl.hasClass(highlightClass)
      rowEl.removeClass(highlightClass)
