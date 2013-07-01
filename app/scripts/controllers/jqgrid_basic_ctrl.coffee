class JqGridBasicCtrl

  @$inject = ["sampleData"]
  constructor: (sampleData) ->
    setupActionClickOver = ->
      actionMenu = "<ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\" style=\"display: block;position: relative;min-width:100px\">                               <li><a tabindex=\"-1\" href=\"#\" class=\"row_action_show\" data-dismiss=\"clickover\"><i class=\"icon-eye-open\"></i> show</a></li>                               <li><a tabindex=\"-1\" href=\"#\" class=\"row_action_edit\" data-dismiss=\"clickover\"><i class=\"icon-edit\"></i> edit</a></li>                               <li><a tabindex=\"-1\" href=\"#\" class=\"row_action_delete\" data-dismiss=\"clickover\"><i class=\"icon-trash\"></i> delete</a></li>                           </ul>"
      $(".jqg-row-action").clickover
        html: true
        content: actionMenu
        template: "<div class=\"popover row-action-popover\"><div class=\"arrow\"></div><div class=\"popover-content dropdown clearfix\" style=\"padding:0;\"></div></div>"
        onShown: ->
          assignActionRowId this
          addActionPopupListeners this

    $grid = $("#demoGrid")
    gboxId = "gbox_#{$grid.attr("id")}"

    $grid.jqGrid
      data: sampleData(100)
      datatype: "local"
      rowNum: 10
      rowList: [10, 20, 30]

      colModel: @gridColumns()
      pager: "#gridPager"
      viewrecords: true
      hidegrid: false
      altRows: true
      shrinkToFit: false
      autowidth: true
      height: "100%"
      sortable: true #allows column reposition
      multiselect: true #one or more row selections
      beforeSelectRow: @beforeSelectRow
      gridComplete: ->
        setupActionClickOver()

    # test responsiveness
    # Get width of parent container
    # Fudge factor to prevent horizontal scrollbars
    $(window).on("resize", (event, ui) ->
      parWidth = $("#" + gboxId).parent().width()
      curWidth = $("#" + gboxId).width()
      w = parWidth - 1
      $grid.setGridWidth w  if Math.abs(w - curWidth) > 2
    ).trigger "resize"

    editColFormatter = (cellvalue, options, rowObject) ->
      "<a class=\"jqg-row-action\" title=\"\" data-toggle=\"popover\" href=\"#\" data-container=\"#" + gboxId + "\"><i class=\"icon-cog\"></i></a>"

  # Handles proper multi selection of rows *
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
          $this.jqGrid "setSelection", rows[i].id, false  unless i is rowidIndex
          i++

      # clear text selection (needed in IE)
      if document.selection and document.selection.empty
        document.selection.empty()
      else window.getSelection().removeAllRanges()  if window.getSelection
    true

  #colNames:['Inv No','Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
  gridColumns: ->
    [
      name: "edit_actions"
      label: " "
      width: 20
      sortable: false
      search: false
      hidedlg: true
      formatter: @editColFormatter
    ,
      name: "id"
      index: "id"
      label: "Inv No"
      key: true
      width: 60
      sorttype: "int"
      search: true
    ,
      name: "invdate"
      index: "invdate"
      editable: true
      label: "Date"
      width: 90
      sorttype: "date"
      formatter: "date"
    ,
      name: "name"
      index: "name"
      width: 200
    ,
      name: "amount"
      index: "amount"
      width: 80
      align: "right"
      sorttype: "float"
      formatter: "number"
    ,
      name: "tax"
      index: "tax"
      width: 80
      align: "right"
      sorttype: "float"
    ,
      name: "total"
      index: "total"
      width: 80
      align: "right"
      sorttype: "float"
    ,
      name: "note"
      index: "note"
      width: 250
      sortable: false
      hidden: true
    ]

controllers = angular.module("angleGrinder.controllers")
controllers.controller("JqGridBasicCtrl", JqGridBasicCtrl)
