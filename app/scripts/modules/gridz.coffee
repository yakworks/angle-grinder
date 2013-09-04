gridz = angular.module("angleGrinder.gridz", [
  "angleGrinder.common"
  "ui.select2"
])

gridz.directive "agGrid", [
  "hasSearchFilters", "$log", (hasSearchFilters, $log) ->
    link = ($scope, $element, attrs, gridCtrl) ->
      # publish agGrid controller to the parent scope
      alias = attrs.agGridName
      $scope[alias] = gridCtrl if alias?

      # Initializes a grid with the given options
      initializeGrid = (gridOptions) ->
        return unless gridOptions?
        $log.info "Initializing the grid", gridOptions

        # TODO generate unique grid id
        $grid = $("#grid", $element)

        # workaround for problem with initial grid size inside the hidden container
        # see http://www.trirand.com/blog/?page_id=393/help/problem-with-autowidth/
        gridOptions.gridComplete = ->
          width = $element.parent().width() - 1
          $grid.setGridWidth(width)

        $grid.gridz(gridOptions)

        showItem = (id) ->
          $scope.$apply ->
            if $scope.showItem? then $scope.showItem(id) else $log.warn("`$scope.showItem` is not defined")

        editItem = (id) ->
          $scope.$apply ->
            if $scope.editItem? then $scope.editItem(id) else $log.warn("`$scope.editItem` is not defined")

        # flash the given row
        flashRowFor = (item, complete = ->) ->
          $row = $($grid[0].rows.namedItem(item.id))

          $row.css "background-color", "#DFF0D8"
          $row.delay(100).fadeOut "medium", ->
            $row.css "background-color", ""

          $row.fadeIn "fast", -> complete()

        # handles click on show action insite the dropdown menu
        $grid.on "showAction", (event, id) ->
          event.preventDefault()
          showItem(id)

        # handles click on edit action insite the dropdown menu
        $grid.on "editAction", (event, id) ->
          event.preventDefault()
          editItem(id)

        # handles click on the cell with `editActionLink` formatter
        $grid.on "click", "a.editActionLink", (event) ->
          event.preventDefault()
          id = $(this).parents("tr:first").attr("id")
          editItem(id)

        $grid.on "deleteAction", (event, id) ->
          event.preventDefault()
          $scope.$apply -> $scope.deleteItem id

        # emit `gridzLoadComplete` event
        $grid.on "jqGridAfterLoadComplete", ->
          $scope.$broadcast "gridzLoadComplete"

        # catch broadcast event after save. This will need to change
        $scope.$on "itemUpdated", (event, item) ->
          if $grid.jqGrid("getInd", item.id)
            $grid.jqGrid "setRowData", item.id, item
          else
            $grid.jqGrid "addRowData", item.id, item, "first"

          flashRowFor item

        $scope.$on "itemDeleted", (event, item) ->
          flashRowFor item, ->
            $grid.jqGrid "delRowData", item.id

        $scope.$on "searchUpdated", (event, filters) ->
          params =
            search: hasSearchFilters(filters)
            postData: filters: JSON.stringify(filters)

          $grid.setGridParam(params).trigger "reloadGrid"

      $scope.$watch attrs.agGrid, initializeGrid

    restrict: "A"
    template: """
              <table id="grid"></table>
              <div id="gridPager"></div>
              """
    link: link

    # TODO create separate controller
    # TODO write specs
    require: "agGrid"
    controller: ($scope, $element) ->
      $grid = $element.find("#grid")

      # Toggle visibility of a column with the given id
      @isColumnHidden = (columnId) ->
        colModel = $grid.jqGrid("getGridParam", "colModel")
        column = _.findWhere(colModel, name: columnId)
        column?.hidden

      # Return `true` if a columnt with the given id is hidden
      @toggleColumn = (columnId) ->
        showOrHide = if @isColumnHidden(columnId) then "showCol" else "hideCol"
        $grid.jqGrid(showOrHide, columnId)
        $grid.trigger("resize")
]

# Takes a nested Javascript object and flatten it.
# see: https://github.com/hughsk/flat
gridz.value "flatten", (target, opts = delimiter: ".") ->
  delimiter = opts.delimiter

  getKey = (key, prev) ->
    if prev then prev + delimiter + key else key

  step = (object, prev) ->
    angular.forEach Object.keys(object), (key) ->
      isArray = opts.safe and object[key] instanceof Array
      type = Object::toString.call(object[key])
      isObject = type is "[object Object]" or type is "[object Array]"

      return step(object[key], getKey(key, prev)) if not isArray and isObject
      output[getKey(key, prev)] = object[key]

  output = {}
  step target
  output
