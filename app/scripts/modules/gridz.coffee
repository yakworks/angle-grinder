gridz = angular.module("angleGrinder.gridz", [])

gridz.directive "agGrid", [
  "hasSearchFilters", (hasSearchFilters) ->
    link = ($scope, element, attrs) ->
      $grid = $("#grid", element)

      gridOptions = $scope.$eval(attrs.agGrid)
      $grid.gridz(gridOptions)

      invokeEditItemDialogFor = (id) ->
        $scope.$apply -> $scope.editDialog id

      # handles click on edit action insite the dropdown menu
      $grid.on "editAction", (event, id) ->
        event.preventDefault()
        invokeEditItemDialogFor(id)

      # handles click on the cell with `editActionLink` formatter
      $grid.on "click", "a.editActionLink", (event) ->
        event.preventDefault()
        id = $(this).parents("tr:first").attr("id")
        invokeEditItemDialogFor(id)

      $grid.on "deleteAction", (event, id) ->
        event.preventDefault()
        $scope.$apply -> $scope.deleteItem id

      # catch broadcast event after save. This will need to change
      $scope.$on "itemUpdated", (event, data) ->
        if $grid.jqGrid("getInd", data.id)
          $grid.jqGrid "setRowData", data.id, data
        else
          $grid.jqGrid "addRowData", data.id, data, "first"

        # flash the row so user knows its updated
        ind = $grid[0].rows.namedItem(data.id)
        $(ind).css "background-color", "#DFF0D8"
        $(ind).delay(100).fadeOut("medium", ->
          $(ind).css "background-color", ""
        ).fadeIn "fast"

      $scope.$on "itemDeleted", (event, item) ->
        $grid.jqGrid "delRowData", item.id

      $scope.$on "searchUpdated", (event, filters) ->
        params =
          search: hasSearchFilters(filters)
          postData: filters: JSON.stringify(filters)

        $grid.setGridParam(params).trigger "reloadGrid"

    restrict: "A"
    template: """
              <table id="grid"></table>
              <div id="gridPager"></div>
              """
    link: link
]

flatten = (target, opts = { delimiter: "." }) ->
  delimiter = opts.delimiter

  getKey = (key, prev) ->
    (if prev then prev + delimiter + key else key)

  step = (object, prev) ->
    Object.keys(object).forEach (key) ->
      isarray = opts.safe and Array.isArray(object[key])
      type = Object::toString.call(object[key])
      isobject = (type is "[object Object]" or type is "[object Array]")
      return step(object[key], getKey(key, prev)) if not isarray and isobject
      output[getKey(key, prev)] = object[key]

  output = {}
  step target
  output

# Takes a nested Javascript object and flatten it.
# see: https://github.com/hughsk/flat
gridz.value "flatten", flatten

# Retunrs true if `filters` contain at least one non-empty search field
hasSearchFilters = (filters) ->
  for _, value of filters
    return true if value? and value.trim() isnt ""
  return false

gridz.value "hasSearchFilters", hasSearchFilters
