gridz = angular.module("angleGrinder.gridz")

gridz.directive "agGrid", [
  "$timeout", "$log", "$parse", "agGridDataLoader", "ActionPopupHandler", "pathWithContext", "camelize"
  ($timeout, $log, $parse, agGridDataLoader, ActionPopupHandler, pathWithContext, camelize) ->

    link = (scope, element, attrs, gridCtrl) ->
      # find grid placeholder
      gridEl = element.find("table.gridz")

      # publish agGrid controller to the parent scope
      alias = attrs.agGridName
      $parse(alias).assign(scope, gridCtrl) if alias
      $parse("$grid").assign(scope, gridCtrl) #Make the grid available to controllers as $scope.$grid

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
          if options.dropGrouping
            gridId = alias
            $('tr.ui-jqgrid-labels th div') .draggable({
              appendTo: 'body',
              helper: 'clone'
            });

            $("##{alias}GroupDropDown div.tagged-input").droppable(
              activeClass: 'ui-state-default'
              hoverClass: 'ui-state-hover'
              accept: ':not(.ui-sortable-helper)'
              drop: (event, ui) ->
                $this = $(this)
                $this.find('.placeholder').remove()
                groupingColumn = $("<div class='tag'></div>").attr('data-column', ui.draggable.attr('id').replace('jqgh_' + gridId + '_', ''))
                $('<i class="fa fa-times" aria-hidden="true"> </i>').click(->
                  $(this).parent().remove()
                  $('#' + gridId).jqGrid 'groupingRemove'
                  $('#' + gridId).jqGrid 'groupingGroupBy', $("##{alias}GroupDropDown div.tag:not(.placeholder)").map(->
                    $(this).attr 'data-column'
                  ).get()
                  if $("##{alias}GroupDropDown div.tag:not(.placeholder)").length == 0
                    $('<div class="placeholder"></div>').appendTo $this
                  return
                ).appendTo groupingColumn
                groupingColumn.append ui.draggable.text()
                groupingColumn.appendTo $this
                $('#' + gridId).jqGrid 'groupingRemove'
                $('#' + gridId).jqGrid 'groupingGroupBy', $("##{alias}GroupDropDown div.tag:not(.placeholder)").map(->
                  $(this).attr 'data-column'
                ).get()
                return
            ).sortable({
              items: 'div.tag:not(.placeholder)'
              sort: ->
                $(this).removeClass 'ui-state-default'
                return
              stop: ->
                $('#' + gridId).jqGrid 'groupingRemove'
                $('#' + gridId).jqGrid 'groupingGroupBy', $("##{alias}GroupDropDown div.tag:not(.placeholder)").map(->
                  $(this).attr 'data-column'
                ).get()
                return
            })

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
        if options.filterToolbar
          gridEl.jqGrid('filterToolbar', {
              beforeSearch: ->
                postData = gridEl.jqGrid('getGridParam', 'postData')
                defaultFilters = postData.defaultFilters || postData.filters
                filters = (_.extend(JSON.parse(defaultFilters), (_.pick postData, (value, key) -> key not in ["page", "filters", "max", "sort", "order", "nd", "_search"])))
                filters.firstLoad = false
                postData.defaultFilters = defaultFilters
                postData.filters = JSON.stringify(filters)
                console.log "Toolbar Search"
            }
          )

        # initialize actionPopup handler
        ActionPopupHandler(gridEl, scope, attrs)
        angular.element(element.find("select").wrap('<span class="select-wrapper"></span>'))

      if options.dropGrouping
        dropDownsection = angular.element """<div >
				 <div class='tagged-input' style="min-height: 35px; margin-bottom: -4px">Drop headers here</div>
			    </div>"""
        dropDownsection.attr("id", "#{alias}GroupDropDown")
        element.prepend(dropDownsection)

      if element.is(":visible")
        # Element is visible, initialize the grid now
        initializeGrid()
      else
        $log.info "grid is not visible:", alias

        # Initialize the grid when the element will be visible
        timeoutPromise = null
        unregister = scope.$watch ->
          $timeout.cancel(timeoutPromise) #Cancel previous timeout

          #We have to do timeout because of this issue with uib-tab https://github.com/angular-ui/bootstrap/issues/3796
          #Otherwise when tab is clicked and digest cycle ($watch) runs, the element.is(":visible") is still false, and hence grid is never initialized.
          timeoutPromise = $timeout(()->
            return unless element.is(":visible")
            # initialize the grid on the visible element
            initializeGrid()

            # unregister the watcher to free resources
            unregister()

          , 100, false) #Here false means don't fire new digest cycle, otherwise $watch will be called infinitely.

          return false



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
