gridz = angular.module("angleGrinder.gridz", [
  "ngSanitize"
  "angleGrinder.common"
  "ui.select2"
])

# Globally expose custom formatters for dates and currencies.
# Used by jgGrid for formatting cell values.
gridz.run [
  "$window", "agDateFilter", "agCurrencyFilter",
  ($window, agDateFilter, agCurrencyFilter) ->

    $window.agDateFilter     = agDateFilter
    $window.agCurrencyFilter = agCurrencyFilter

]

gridz.directive "agGrid", [
  "$log", "$parse", "agGridDataLoader", "actionPopupHandler", "pathWithContext", "camelize",
  ($log, $parse, agGridDataLoader, actionPopupHandler, pathWithContext, camelize) ->

    link = (scope, element, attrs, gridCtrl) ->
      # find grid placeholder
      gridEl = element.find("table.gridz")

      # publish agGrid controller to the parent scope
      alias = attrs.agGridName
      $parse(alias).assign(scope, gridCtrl) if alias

      # read grid options
      options = $parse(attrs.agGrid)(scope)
      throw new Error("undefined grid options") unless options

      # read colModel from the `ag-grid-col-model` attribute
      options.colModel = angular.fromJson(attrs.agGridColModel) if attrs.agGridColModel

      # kill the grid when the related scope is destroyed
      scope.$on "$destroy", ->
        $log.debug "[agGrid] destroying the grid", gridEl
        gridEl.jqGrid("GridDestroy")

      # Initializes a grid with the given options
      initializeGrid = ->
        $log.debug "[agGrid] initializing '#{alias}' with", options

        # assign the url
        if not options.url? and options.path?
          options.url = pathWithContext(options.path)

        # use `$http` service to load the grid data
        if options.datatype is undefined or options.datatype is null
          options.datatype = agGridDataLoader(options.url, gridCtrl)

        gridEl.on "jqGridAfterGridComplete", () ->
          # Add `min` class to remove pading to minimize row height
          if options.minRowHeight
            _.each gridEl[0].rows, (it) ->
              angular.element(it).addClass('min')

        # jqGrid sucks at this point it expects `pager` to be an id
        unless options.pager is false
          options.pager = element.find(".gridz-pager").attr("id") or "gridz-pager"

        if options.selectFirstRow is true
          _gridComplete = options.gridComplete

          onGridComplete = ->
            dataIds = gridEl.getDataIDs()
            if dataIds.length > 0
              gridEl.setSelection dataIds[0], true
            _gridComplete.apply this, arguments if _.isFunction(_gridComplete)

          options.gridComplete = onGridComplete;

        # initialize jqGrid on the given element
        gridEl.gridz(options)

        # initialize actionPopup handler
        actionPopupHandler(gridEl, scope, attrs)

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
