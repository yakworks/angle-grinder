directives = angular.module("angleGrinder.directives")

directives.directive "agGrid", ->
  link = ($scope, element, attrs) ->
    $grid = $("#grid", element)

    gridOptions = $scope.$eval(attrs.agGrid)
    $grid.gridz(gridOptions)

    $grid.on "click", "a.editActionLink", (event) ->
      event.preventDefault()
      id = $(this).parents("tr:first").attr("id")
      $scope.$apply ->
        $scope.editDialog id

    # catch broadcast event after save. This will need to change
    $scope.$on "itemUpdated", (event, data) ->
      if not $grid.jqGrid("getInd", data.id)
        $grid.jqGrid "addRowData", data.id, data, "first"
      else
        $grid.jqGrid "setRowData", data.id, data
      ind = $grid[0].rows.namedItem(data.id)

      # flash the row so use knows its updated
      $(ind).css "background-color", "#DFF0D8"
      $(ind).delay(100).fadeOut("medium", ->
        $(ind).css "background-color", ""
      ).fadeIn "fast"

    $scope.$on "searchUpdated", (event, filter, currentScope = null) ->
      currentScope?.searching = true

      $grid.setGridParam(
        search: true
        postData: filters: JSON.stringify(filter)
      ).trigger "reloadGrid"

      currentScope?.searching = false

  restrict: "A"
  template: """
            <table id="grid"></table>
            <div id="gridPager"></div>
            """
  link: link
