gridz = angular.module("angleGrinder.gridz")

# Wrapper for jqGrid public API
# Controller instance could be published to the parent scope
# with `ag-grid-name` directive, for example:
# `<div ag-grid="gridOptions" ag-grid-name="usersGrid"></div>`
gridz.controller "AgGridCtrl", class
  @$inject = ["$scope", "$element", "hasSearchFilters"]
  constructor: ($scope, $element, hasSearchFilters) ->
    # TODO assign $grid from the directive
    @$grid = $element.find("table.gridz")
    @hasSearchFilters = hasSearchFilters

  getGridId: ->
    @$grid.attr("id")

  # Gives the currently selected rows when multiselect is set to true.
  # This is a one-dimensional array and the values in the array correspond
  # to the selected id's in the grid.
  getSelectedRowIds: ->
    @getParam("selarrrow")

  # Reloads the grid with the current settings
  reload: ->
    @$grid.trigger("reloadGrid")

  # Gets a particular grid parameter
  getParam: (name) ->
    @$grid.getGridParam(name)

  # Sets a particular grid parameter
  setParam: (params) ->
    @$grid.setGridParam(params)

  # Sets the grid search filters and triggers a reload
  search: (filters) ->
    params =
      search: @hasSearchFilters(filters)
      postData: filters: JSON.stringify(filters)

    @setParam(params)
    @reload()

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
