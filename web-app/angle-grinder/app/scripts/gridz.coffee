# Class definition
# TODO use pure coffeescript clas
Gridz = (element, options) ->
  @init element, options

Gridz:: =
  init: (element, opts) ->
    $el = $(element)

    @$element = $el
    @$el = $el
    @$grid = $el
    @gridId = $el.attr("id")

    ###
    the containing div for the grid , will be built after jqGrid is called
    ###
    @gboxId = "gbox_#{@gridId}"
    @options = @getOptions(opts)

    @addRowActionColumn() if @options.actionPopup

    # call the jqgrid
    $el.jqGrid @options

    @responsiveResize()

  getOptions: (options) ->
    options = $.extend({}, $.fn.gridz.defaults, options)

    #Events .. beforeSelectRow
    optBeforeSelectRow = options.beforeSelectRow
    options.beforeSelectRow = (rowid, e) =>
      @beforeSelectRow.apply this, arguments
      optBeforeSelectRow.apply this, arguments  if $.isFunction(optBeforeSelectRow)
      true

    # Events .. gridComplete
    _gridComplete = options.gridComplete
    options.gridComplete = =>
      @gridComplete.apply @
      _gridComplete.apply this, arguments if $.isFunction(_gridComplete)
      @$grid.trigger "gridComplete"

    # if sortable is true then add exclusion for the action column
    if options.actionPopup and options.sortable
      options.sortable = exclude: "##{@gridId}_row_action_col"

    options

  ###
  stuff to do after the grid is completed loading and rendering
  ###
  gridComplete: ->
    @actionPopupSetup() if @options.actionPopup
    gid = "jqgh_#{@$element.attr("id")}_row_action_col"

  # disable the sortable property on the action column
  #$('tr.ui-jqgrid-labels').sortable({ cancel: 'th:#'+gid});
  # update the list of sortable item's, and exclude your target element
  #$('tr.ui-jqgrid-labels').sortable({ items: "th:not(#" + gid + ")" });

  ###
  Handles proper multi selection of rows
  ###
  beforeSelectRow: (rowid, e) ->
    $this = $(this)
    rows = @rows
    # get id of the previous selected row
    startId = $this.jqGrid("getGridParam", "selrow")
    startRow = undefined
    endRow = undefined
    iStart = undefined
    iEnd = undefined
    i = undefined
    rowidIndex = undefined
    isCheckBox = $(e.target).hasClass("cbox")

    if not e.ctrlKey and not e.shiftKey and not e.metaKey and not isCheckBox
      $this.jqGrid "resetSelection"
    else if startId and e.shiftKey

      #console.log("shift select")
      $this.jqGrid "resetSelection"

      # get DOM elements of the previous selected and
      # the currect selected rows
      startRow = rows.namedItem(startId)
      endRow = rows.namedItem(rowid)
      if startRow and endRow

        # get min and max from the indexes of the previous selected
        # and the currect selected rows
        iStart = Math.min(startRow.rowIndex, endRow.rowIndex)
        rowidIndex = endRow.rowIndex
        iEnd = Math.max(startRow.rowIndex, rowidIndex)
        i = iStart
        while i <= iEnd
          # the row with rowid will be selected by
          # jqGrid. So we don't need select it
          $this.jqGrid "setSelection", rows[i].id, false if i isnt rowidIndex
          i++

      # clear text selection
      if document.selection and document.selection.empty
        document.selection.empty()
      else window.getSelection().removeAllRanges() if window.getSelection

    true

  ###
  adds listener to resize grid to parent container when window is resized.
  This will work for reponsive and fluid layouts
  ###
  responsiveResize: ->
    $grid = @$element
    gboxId = "#gbox_#{$grid.attr("id")}"
    $(window).on "resize", (event, ui) ->

      # Get width of parent container which is assumed to be expanded to span
      parWidth = $(gboxId).parent().width()
      curWidth = $(gboxId).width()
      w = parWidth - 1 # add -1 Fudge factor to prevent horizontal scrollbars

      if Math.abs(w - curWidth) > 2
        $grid.setGridWidth w

  #.trigger('resize')

  #*************Action popup methods*************

  ###
  adds the action column and formatter.
  ###
  addRowActionColumn: ->
    self = this
    opts = @options
    containerId = "gbox_#{@$element.attr("id")}"
    opts.colModel.unshift
      name: "row_action_col" # can't resize
      label: " "
      width: 20
      sortable: false
      search: false
      hidedlg: true
      resizable: false
      fixed: true # don't auto calc size
      formatter: (cellValue, colOptions, rowObject) ->
        func = opts.actionPopup.cellFormatter or self.actionPopupFormatter
        func containerId, cellValue, colOptions, rowObject

  ###
  default rowActionFormatter. containerId is the dom el to add the drop down to
  ###
  actionPopupFormatter: (containerId) ->
    '<a class="jqg-row-action" title="" data-toggle="popover"
        href="#" data-container="#' + containerId + '"><i class="icon-cog"></i></a>'

  #called after grid complete to setup the menu
  actionPopupSetup: ->
    self = this
    options = @options
    actionMenu = undefined

    if options.actionPopup.menuList
      actionMenu = options.actionPopup.menuList
    else
      actionMenu = """
                   <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
                     <li><a href="#" class="row_action_show" data-dismiss="clickover">
                       <i class="icon-eye-open"></i>show</a>
                     </li>
                     <li><a href="#" class="row_action_edit" data-dismiss="clickover">
                       <i class="icon-edit"></i>edit</a>
                     </li>
                     <li><a href="#" class="row_action_delete" data-dismiss="clickover">
                       <i class="icon-trash"></i>delete</a>
                     </li>
                   </ul>
                   """

    $(".jqg-row-action").clickover
      html: true
      content: actionMenu
      template: """
                <div class="popover row-action-popover">
                  <div class="arrow"></div>
                  <div class="popover-content dropdown clearfix" style="padding: 0;"></div>
                </div>
                """
      onShown: ->
        self.actionPopupOnShow.call self, this

  #this = the clickover <a>
  #assignActionRowId.call(self,this)
  #addActionPopupListeners(self,this,$grid)

  #fired when the clickover is shown
  actionPopupOnShow: (clickoverEl) ->
    self = this

    $grid = @$element
    id = $(clickoverEl.$element, $grid.rows).parents("tr:first").attr("id")

    $grid.data "actionRowId", id
    $grid.jqGrid "resetSelection"
    $grid.jqGrid "setSelection", id

    $menu = $("##{self.gboxId} .dropdown-menu")

    $menu.on "click", "li a.row_action_show", (e) ->
      $grid.trigger "showAction"

    $menu.on "click", "li a.row_action_edit", (e) ->
      $grid.trigger "editAction", [id, self]

    $menu.on "click", "li a.row_action_delete", (e) ->
      $grid.trigger "deleteAction"

# register namespace
$.extend true, window, grinder: Grid: Gridz

# Jquery Plugin definition
$.fn.gridz = (option) ->
  if typeof option is "string"
    otherArgs = Array::slice.call(arguments, 1)
    instance = $(this).data("gridz")
    if instance and instance[option]
      instance[option].apply this, otherArgs
    else # try passing through to jqgrid
    return $(this).jqGrid(arguments)
  @each ->
    $this = $(this)
    instance = $this.data("gridz")
    options = (if typeof option is "object" then option else {})
    $this.data "gridz", (instance = new Gridz(this, options))  unless instance

$.fn.gridz.Constructor = Gridz

$.fn.gridz.defaults =
  prmNames:
    page: "page"
    rows: "max"
    sort: "sort"
    order: "order"

  jsonReader:
    repeatitems: false

  datatype: "json"
  mtype: "GET" # for the ajax json read
  rowNum: 20 # num rows to show by default
  rowList: [10, 20, 50, 100]
  altRows: true
  shrinkToFit: false
  autowidth: true
  height: "100%"
  sortable: true
  multiselect: true #one or more row selections
  pager: "#gridPager"

  # onSortCol:sortColumn,
  # onPaging:pagingChange,
  beforeSelectRow: null
  gridComplete: null
  actionPopup:
    formatter: null
    menuList: null

# Extra formatters for jqGrid
$.extend $.fn.fmatter,
  okIcon: (cellVal, options, rowdata) ->
    if cellVal then "<i class='icon-ok'></i>" else ""

  editActionLink: (cellVal, options, rowdata) ->
    "<a class='editActionLink' href='#' >#{cellVal}</a>"
