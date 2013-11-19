gridz = angular.module("angleGrinder.gridz", [
  "angleGrinder.common"
  "ui.select2"
])

gridz.factory "actionPopupHandler", [
  "$log", ($log) ->

    ($grid, scope) ->
      # handles an action from the `actionPopup` menu
      handleAction = (action, id) ->
        if scope[action]?
          $log.info "Trigger '#{action}' for row '#{id}'"
          scope.$apply -> scope[action](id)
        else
          $log.warn("`$scope.#{action}` is not defined")

      # handles click on show action insite the dropdown menu
      $grid.on "showAction", (event, id) ->
        event.preventDefault()
        handleAction("showItem", id)

      # handles click on edit action insite the dropdown menu
      $grid.on "editAction", (event, id) ->
        event.preventDefault()
        handleAction("editItem", id)

      # handles click on delete action inside the dropdown menu
      $grid.on "deleteAction", (event, id) ->
        event.preventDefault()
        handleAction("deleteItem", id)

      # handles click on the cell with `editActionLink` formatter
      $grid.on "click", "a.editActionLink", (event) ->
        event.preventDefault()
        id = $(this).parents("tr:first").attr("id")
        handleAction("editItem", id)
]

gridz.directive "agGrid", [
  "$log", "actionPopupHandler", "pathWithContext", ($log, actionPopupHandler, pathWithContext) ->
    link = (scope, element, attrs, gridCtrl) ->
      # initialize the controller
      gridCtrl.registerGridElement(element.find("table.gridz"))

      # publish agGrid controller to the parent scope
      gridName = attrs.agGridName
      scope[gridName] = gridCtrl if gridName

      # Initializes a grid with the given options
      initializeGrid = (gridOptions) ->
        return unless gridOptions?
        $log.info "Initializing '#{gridName}'", gridOptions

        # find grid placeholder
        $grid = element.find("table.gridz")

        # assign the url
        if not gridOptions.url? and gridOptions.path?
          gridOptions.url = pathWithContext(gridOptions.path)

        # jqGrid suks at this point it expects `pager` to be an id
        gridOptions.pager = element.find(".gridz-pager").attr("id") or "gridz-pager"

        # initialize jqGrid on the given element
        $grid.gridz(gridOptions)

        # initialize actionPopup handler
        actionPopupHandler($grid, scope)

      if element.is(":visible")
        # Element is visible, initialize the grid now
        initializeGrid(scope[attrs.agGrid])
      else
        $log.info "grid is not visible:", gridName

        # Initialize the grid when the element will be visible
        unregister = scope.$watch ->
          if element.is(":visible")
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
