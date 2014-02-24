gridz = angular.module("angleGrinder.gridz", [
  "angleGrinder.common"
  "ui.select2"
])

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

      # read colModel from the `ag-grid-col-model` attribute
      options.colModel = angular.fromJson(attrs.agGridColModel) if attrs.agGridColModel

      # Initializes a grid with the given options
      initializeGrid = ->
        $log.info "Initializing '#{alias}' with", options

        # find grid placeholder
        $grid = element.find("table.gridz")

        # assign the url
        if not options.url? and options.path?
          options.url = pathWithContext(options.path)

        # jqGrid suks at this point it expects `pager` to be an id
        unless options.pager is false
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
          return unless element.is(":visible")

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
