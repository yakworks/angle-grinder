gridz = angular.module("angleGrinder.gridz")

# Wrapper for jqGrid public API
# TODO write some docs here
gridz.controller "AgGridCtrl", class
  @$inject = ["$scope", "$element"]
  constructor: ($scope, $element) ->
    @$grid = $element.find("#grid")

  # Returns `true` if a columnt with the given id is hidden
  isColumnHidden: (columnId) ->
    colModel = @$grid.jqGrid("getGridParam", "colModel")
    column = _.findWhere(colModel, name: columnId)
    column?.hidden

  # Toggle visibility of a column with the given id
  toggleColumn: (columnId) ->
    showOrHide = if @isColumnHidden(columnId) then "showCol" else "hideCol"
    @$grid.jqGrid(showOrHide, columnId)
    @$grid.trigger("resize")

  # Invokes a dialog for choosing and reordering grid's columns
  # see: http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3ajquery_ui_methods#column_chooser
  columnChooser: (options = {}) ->
    # function which will be called when the user press Ok button
    # inside the column chooser dialog
    options.done = (perm) =>
      # call `remapColumns` method in order to reorder the columns
      @$grid.jqGrid("remapColumns", perm, true) if perm

      # TODO at this point we could store column model in the local storage
      console.log @$grid.jqGrid("getGridParam", "colModel")

    @$grid.jqGrid("columnChooser", options)

