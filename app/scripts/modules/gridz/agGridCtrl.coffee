gridz = angular.module("angleGrinder.gridz")

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
