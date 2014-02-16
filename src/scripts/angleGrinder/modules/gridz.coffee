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
  "$log", "$parse", "actionPopupHandler", "pathWithContext", "camelize",
  ($log, $parse, actionPopupHandler, pathWithContext, camelize) ->

    link = (scope, element, attrs, controller) ->
      # initialize the controller
      controller.registerGridElement(element.find("table.gridz"))

      # publish agGrid controller to the parent scope
      alias = attrs.agGridName
      $parse(alias).assign(scope, controller) if alias

      # read grid options
      options = $parse(attrs.agGrid)(scope)
      throw new Error("undefined grid options") unless options

      # Initializes a grid with the given options
      initializeGrid = ->
        $log.info "Initializing '#{alias}' with", options

        # find grid placeholder
        $grid = element.find("table.gridz")

        # assign the url
        if not options.url? and options.path?
          options.url = pathWithContext(options.path)

        # jqGrid suks at this point it expects `pager` to be an id
        options.pager = element.find(".gridz-pager").attr("id") or "gridz-pager"

        # initialize jqGrid on the given element
        $grid.gridz(options)

        # initialize actionPopup handler
        actionPopupHandler($grid, scope)

      if element.is(":visible")
        # Element is visible, initialize the grid now
        initializeGrid()
      else
        $log.info "grid is not visible:", alias

        # Initialize the grid when the element will be visible
        unregister = scope.$watch ->
          if element.is(":visible")
            # initialize the grid on the visible element
            initializeGrid()

            # unregister the watcher to free resources
            unregister()

    restrict: "A"

    require: "agGrid"
    controller: "AgGridCtrl"

    template: """
      <table class="gridz"></table>
      <div class="gridz-pager"></div>
    """

    compile: (element, attrs) ->
      # modify grid html element, generate grid id from the name or assign default value
      id = if attrs.agGridName? then camelize(attrs.agGridName) else "gridz"

      element.find("table.gridz").attr("id", id)
      element.find("div.gridz-pager").attr("id", "#{id}-pager")

      # return linking function which will be called at a later time
      post: link
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
