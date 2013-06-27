module = angular.module("admin.directives", [])

module.directive "agGrid", ->
  link = ($scope, element, attrs) ->
    gridOpts = $scope.$eval(attrs.agGrid)
    $grid = $("#grid", element)
    $grid.on "click", "a.editActionLink", (evt) ->
      evt.preventDefault()
      id = $(this).parents("tr:first").attr("id")
      $scope.$apply ->
        $scope.editDialog id


    $grid.gridz gridOpts
    grid = $grid[0]

    # catch broadcast event after save. This will need to change
    $scope.$on "itemUpdated", (evt, data) ->
      if $grid.jqGrid("getInd", data.id) is false
        $grid.jqGrid "addRowData", data.id, data, "first"
      else
        $grid.jqGrid "setRowData", data.id, data
      ind = $grid[0].rows.namedItem(data.id)

      # flash the row so use knows its updated
      $(ind).css "background-color", "#DFF0D8"
      $(ind).delay(100).fadeOut("medium", ->
        $(ind).css "background-color", ""
      ).fadeIn "fast"

    $scope.$on "searchUpdated", (evt, filter, cscope) ->
      cscope.searching = true  if cscope
      $grid.setGridParam(
        search: true
        postData:
          filters: JSON.stringify(filter)
      ).trigger "reloadGrid"
      cscope.searching = false  if cscope

  restrict: "A"
  template: "<table id='grid'></table><div id='gridPager'></div>"
  link: link
