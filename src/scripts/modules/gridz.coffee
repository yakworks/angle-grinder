gridz = angular.module("angleGrinder.gridz", [
  "angleGrinder.common"
  "ui.select2"
])

gridz.directive "agGrid", [
  "$log", "pathWithContext", ($log, pathWithContext) ->
    link = (scope, element, attrs, gridCtrl) ->
      # initialize the controller
      gridCtrl.registerGridElement(element.find("table.gridz"))

      # publish agGrid controller to the parent scope
      alias = attrs.agGridName
      scope[alias] = gridCtrl if alias?

      # Initializes a grid with the given options
      initializeGrid = (gridOptions) ->
        return unless gridOptions?
        $log.info "Initializing the grid", gridOptions

        # find grid placeholder
        $grid = element.find("table.gridz")

        # assign the url
        if not gridOptions.url? and gridOptions.path?
          gridOptions.url = pathWithContext(gridOptions.path)

        # jqGrid suks at this point it expects `pager` to be an id
        gridOptions.pager = element.find(".gridz-pager").attr("id") or "gridz-pager"

        # workaround for problem with initial grid size inside the hidden container
        # see http://www.trirand.com/blog/?page_id=393/help/problem-with-autowidth/
        gridOptions.gridComplete = ->
          width = element.parent().width() - 1
          $grid.setGridWidth(width)

        $grid.gridz(gridOptions)

        handleAction = (action, id) ->
          if scope[action]?
            scope.$apply -> scope[action](id)
          else
            $log.warn("`$scope.#{action}` is not defined")

        # handles click on show action insite the dropdown menu
        $grid.on "showAction", (event, id) ->
          event.preventDefault()
          handleAction("showItem" ,id)

        # handles click on edit action insite the dropdown menu
        $grid.on "editAction", (event, id) ->
          event.preventDefault()
          handleAction("editItem" ,id)

        # handles click on delete action inside the dropdown menu
        $grid.on "deleteAction", (event, id) ->
          event.preventDefault()
          handleAction("deleteItem" ,id)

        # handles click on the cell with `editActionLink` formatter
        $grid.on "click", "a.editActionLink", (event) ->
          event.preventDefault()
          id = $(this).parents("tr:first").attr("id")
          handleAction("editItem" ,id)

      # Will check if the grid element is visible
      # (used for creating a stub in the tests)
      visibilityChecker = scope[attrs.agGrid].visibilityChecker or (element) -> element.is(":visible")

      # Initialize the grid when the element is visible
      unregister = scope.$watch ->
        if visibilityChecker(element)
          # initialize the grid on the visible element
          initializeGrid(scope[attrs.agGrid])
          # unregister the watcher to free resources
          unregister()

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
