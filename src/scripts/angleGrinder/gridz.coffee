class Gridz
  constructor: (element, options) ->
    @init element, options

  init: (element, opts) ->
    @gridEl = $(element)
    @gridId = @gridEl.attr("id")

    # the containing div for the grid, will be built after jqGrid is called
    @gboxId = "gbox_#{@gridId}"
    @options = @getOptions(opts)

    @addRowActionColumn() if @options.actionPopup

    # call the jqgrid
    @gridEl.jqGrid @options

    @responsiveResize()

  getOptions: (options) ->
    options = $.extend({}, $.fn.gridz.defaults, options)

    # Events .. beforeSelectRow
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
      @gridEl.trigger "gridComplete"

    # if sortable is true then add exclusion for the action column
    if options.actionPopup and options.sortable
      options.sortable = exclude: "##{@gridId}_-row_action_col"

    options

  ###
  stuff to do after the grid is completed loading and rendering
  ###
  gridComplete: ->
    @actionPopupSetup() if @options.actionPopup

  ###
  Handles proper multi selection of rows
  ###
  beforeSelectRow: (rowid, e) ->
    rows = @gridEl[0].rows

    # get id of the previous selected row
    startId = @gridEl.jqGrid("getGridParam", "selrow")
    isCheckBox = $(e.target).hasClass("cbox")

    if not e.ctrlKey and not e.shiftKey and not e.metaKey and not isCheckBox
      @gridEl.jqGrid "resetSelection"
    else if startId and e.shiftKey

      @gridEl.jqGrid "resetSelection"

      # get DOM elements of the previous selected and
      # the selected rows
      startRow = rows.namedItem(startId)
      endRow = rows.namedItem(rowid)
      if startRow and endRow

        # get min and max from the indexes of the previous selected
        # and the selected rows
        iStart = Math.min(startRow.rowIndex, endRow.rowIndex)
        rowIdIndex = endRow.rowIndex
        iEnd = Math.max(startRow.rowIndex, rowIdIndex)
        i = iStart
        while i <= iEnd
          # the row with rowid will be selected by
          # jqGrid. So we don't need select it
          @gridEl.jqGrid "setSelection", rows[i].id, false if i isnt rowIdIndex
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
    gboxId = "#gbox_#{@gridEl.attr("id")}"
    $(window).on "resize", (event, ui) =>

      # Get width of parent container which is assumed to be expanded to span
      parWidth = $(gboxId).parent().width()
      curWidth = $(gboxId).width()
      w = parWidth - 1 # add -1 Fudge factor to prevent horizontal scrollbars

      if Math.abs(w - curWidth) > 2
        @gridEl.setGridWidth w

  #*************Action popup methods*************

  ###
  adds the action column and formatter.
  ###
  addRowActionColumn: ->
    containerId = "gbox_#{@gridEl.attr("id")}"

    actionCol =
      name: "-row_action_col" # can't resize
      label: " "
      width: 20
      sortable: false
      search: false
      hidedlg: true
      resizable: false
      fixed: true # don't auto calc size

      formatter: (cellValue, colOptions, rowObject) =>
        formatter = @options.actionPopup.cellFormatter or this.actionPopupFormatter
        formatter(containerId, cellValue, colOptions, rowObject)

    @options.colModel.unshift(actionCol)

  ###
  default rowActionFormatter. containerId is the dom el to add the drop down to
  ###
  actionPopupFormatter: (containerId) ->
    """
    <a class="jqg-row-action" data-toggle="popover" href="#"
       data-container="##{containerId}"><i class="fa fa-cog"></i></a>
    """

  # called after grid complete to setup the menu
  actionPopupSetup: ->
    self = this
    options = @options

    actionMenu = ""
    if options.actionPopup.menuList
      actionMenu = options.actionPopup.menuList
    else
      actionMenu = """
                   <ul class="dropdown-menu" role="menu">
                     <li><a href="#" class="row_action_show" data-dismiss="clickover">
                       <i class="fa fa-eye"></i>show</a>
                     </li>
                     <li><a href="#" class="row_action_edit" data-dismiss="clickover">
                       <i class="fa fa-pencil-square-o"></i>edit</a>
                     </li>
                     <li><a href="#" class="row_action_delete" data-dismiss="clickover">
                       <i class="fa fa-trash-o"></i>delete</a>
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

  # fired when the clickover is shown
  actionPopupOnShow: (clickoverEl) ->
    self = this
    id = $(clickoverEl.$element, @gridEl.rows).parents("tr:first").attr("id")

    @gridEl.data "actionRowId", id
    @gridEl.jqGrid "resetSelection"
    @gridEl.jqGrid "setSelection", id

    menuEl = $("##{self.gboxId} .dropdown-menu")

    menuEl.on "click", "li a.row_action_show", (e) =>
      e.preventDefault()
      @gridEl.trigger "showAction", [id, self]

    menuEl.on "click", "li a.row_action_edit", (e) =>
      e.preventDefault()
      @gridEl.trigger "editAction", [id, self]

    menuEl.on "click", "li a.row_action_delete", (e) =>
      e.preventDefault()
      @gridEl.trigger "deleteAction", [id, self]

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
    el = $(this)

    instance = el.data("gridz")
    options = if typeof option is "object" then option else {}
    el.data "gridz", (instance = new Gridz(this, options)) unless instance

$.fn.gridz.Constructor = Gridz

$.fn.gridz.defaults =
  prmNames:
    page: "page"
    rows: "max"
    sort: "sort"
    order: "order"

  jsonReader:
    repeatitems: false

  # Defines in what format to expect the data that fills the grid.
  #   json  - use internal jqgrid function to load the data via ajax
  #   local - use local data
  datatype: "json"

  mtype: "GET" # for the ajax json read
  rowNum: 20 # num rows to show by default
  rowList: [10, 20, 50, 100]
  altRows: true
  shrinkToFit: false
  autowidth: true
  height: "100%"
  sortable: true
  multiselect: true # one or more row selections

  beforeSelectRow: null
  gridComplete: null
  actionPopup:
    formatter: null
    menuList: null

# Extra formatters for jqGrid
$.extend $.fn.fmatter,

  # use `agDateFilter` for format dates
  date:     (cellVal) -> window.agDateFilter(cellVal)

  # use `agCurrencyFilter` for format currencies
  currency: (cellVal) -> window.agCurrencyFilter(cellVal)

  # use `agCurrencyFilter` for format currencies, use 0 for empty/null/undefined value
  currencyOrZero: (cellVal) ->
    if typeof(cellVal) == 'undefined' or cellVal == null or cellVal == 'null' or cellVal == ''
      cellVal = 0
    window.agCurrencyFilter(cellVal)

  okIcon: (cellVal, options, rowdata) ->
    if cellVal then "<i class='fa fa-check'></i>" else ""

  editActionLink: (cellVal, options, rowdata) ->
    """
    <a class="editActionLink" href="#">#{cellVal}</a>
    """
