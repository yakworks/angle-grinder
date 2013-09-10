gridz = angular.module("angleGrinder.gridz", [
  "angleGrinder.common"
  "ui.select2"
])

gridz.directive "agGrid", [
  "$log", ($log) ->
    link = ($scope, $element, attrs, gridCtrl) ->
      # publish agGrid controller to the parent scope
      alias = attrs.agGridName
      $scope[alias] = gridCtrl if alias?

      # Initializes a grid with the given options
      initializeGrid = (gridOptions) ->
        return unless gridOptions?
        $log.info "Initializing the grid", gridOptions

        # find grid placeholder
        $grid = $element.find("table.gridz")

        # jqGrid suks at this point it expects `pager` to be an id
        gridOptions.pager = $element.find(".gridz-pager").attr("id") or "gridz-pager"

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

      $scope.$watch attrs.agGrid, initializeGrid

    restrict: "A"

    template: """
      <table class="gridz"></table>
      <div class="gridz-pager"></div>
    """

    compile: (element, attrs) ->
      # generate grid id from the name or assign default value
      alias = attrs.agGridName or "gridz"
      element.find("table.gridz").attr("id", alias)
      element.find("div.gridz-pager").attr("id", "#{alias}-pager")

      post: link

    require: "agGrid"
    controller: "AgGridCtrl"
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
