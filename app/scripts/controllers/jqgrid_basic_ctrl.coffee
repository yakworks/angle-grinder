class JqGridBasicCtrl

  constructor: ->
    setupActionClickOver = ->
      actionMenu = "<ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\" style=\"display: block;position: relative;min-width:100px\">                               <li><a tabindex=\"-1\" href=\"#\" class=\"row_action_show\" data-dismiss=\"clickover\"><i class=\"icon-eye-open\"></i> show</a></li>                               <li><a tabindex=\"-1\" href=\"#\" class=\"row_action_edit\" data-dismiss=\"clickover\"><i class=\"icon-edit\"></i> edit</a></li>                               <li><a tabindex=\"-1\" href=\"#\" class=\"row_action_delete\" data-dismiss=\"clickover\"><i class=\"icon-trash\"></i> delete</a></li>                           </ul>"
      $(".jqg-row-action").clickover
        html: true
        content: actionMenu
        template: "<div class=\"popover row-action-popover\"><div class=\"arrow\"></div><div class=\"popover-content dropdown clearfix\" style=\"padding:0;\"></div></div>"
        onShown: ->
          assignActionRowId this
          addActionPopupListeners this

    mydata = [
      id: "1"
      invdate: "2010-05-24"
      name: "test"
      note: "note"
      tax: "10.00"
      total: "2111.00"
    ,
      id: "2"
      invdate: "2010-05-25"
      name: "test2"
      note: "note2"
      tax: "20.00"
      total: "320.00"
    ,
      id: "3"
      invdate: "2007-09-01"
      name: "test3"
      note: "note3"
      tax: "30.00"
      total: "430.00"
    ,
      id: "4"
      invdate: "2007-10-04"
      name: "test"
      note: "note"
      tax: "10.00"
      total: "210.00"
    ,
      id: "5"
      invdate: "2007-10-05"
      name: "test2"
      note: "note2"
      tax: "20.00"
      total: "320.00"
    ,
      id: "6"
      invdate: "2007-09-06"
      name: "test3"
      note: "note3"
      tax: "30.00"
      total: "430.00"
    ,
      id: "7"
      invdate: "2007-10-04"
      name: "test"
      note: "note"
      tax: "10.00"
      total: "210.00"
    ,
      id: "8"
      invdate: "2007-10-03"
      name: "test2"
      note: "note2"
      amount: "300.00"
      tax: "21.00"
      total: "320.00"
    ,
      id: "9"
      invdate: "2007-09-01"
      name: "test3"
      note: "note3"
      amount: "400.00"
      tax: "30.00"
      total: "430.00"
    ,
      id: "11"
      invdate: "2007-10-01"
      name: "test"
      note: "note"
      amount: "200.00"
      tax: "10.00"
      total: "210.00"
    ,
      id: "12"
      invdate: "2007-10-02"
      name: "test2"
      note: "note2"
      amount: "300.00"
      tax: "20.00"
      total: "320.00"
    ,
      id: "13"
      invdate: "2007-09-01"
      name: "test3"
      note: "note3"
      amount: "400.00"
      tax: "30.00"
      total: "430.00"
    ,
      id: "14"
      invdate: "2007-10-04"
      name: "test"
      note: "note"
      amount: "200.00"
      tax: "10.00"
      total: "210.00"
    ,
      id: "15"
      invdate: "2007-10-05"
      name: "test2"
      note: "note2"
      amount: "300.00"
      tax: "20.00"
      total: "320.00"
    ,
      id: "16"
      invdate: "2007-09-06"
      name: "test3"
      note: "note3"
      amount: "400.00"
      tax: "30.00"
      total: "430.00"
    ,
      id: "17"
      invdate: "2007-10-04"
      name: "test"
      note: "note"
      amount: "200.00"
      tax: "10.00"
      total: "210.00"
    ,
      id: "18"
      invdate: "2007-10-03"
      name: "test2"
      note: "note2"
      amount: "300.00"
      tax: "20.00"
      total: "320.00"
    ,
      id: "19"
      invdate: "2007-09-01"
      name: "test3"
      note: "note3"
      amount: "400.00"
      tax: "30.00"
      total: "430.00"
    ,
      id: "21"
      invdate: "2007-10-01"
      name: "test"
      note: "note"
      amount: "200.00"
      tax: "10.00"
      total: "210.00"
    ,
      id: "22"
      invdate: "2007-10-02"
      name: "test2"
      note: "note2"
      amount: "300.00"
      tax: "20.00"
      total: "320.00"
    ,
      id: "23"
      invdate: "2007-09-01"
      name: "test3"
      note: "note3"
      amount: "400.00"
      tax: "30.00"
      total: "430.00"
    ,
      id: "24"
      invdate: "2007-10-04"
      name: "test"
      note: "note"
      amount: "200.00"
      tax: "10.00"
      total: "210.00"
    ,
      id: "25"
      invdate: "2007-10-05"
      name: "test2"
      note: "note2"
      amount: "300.00"
      tax: "20.00"
      total: "320.00"
    ,
      id: "26"
      invdate: "2007-09-06"
      name: "test3"
      note: "note3"
      amount: "400.00"
      tax: "30.00"
      total: "430.00"
    ,
      id: "27"
      invdate: "2007-10-04"
      name: "test"
      note: "note"
      amount: "200.00"
      tax: "10.00"
      total: "210.00"
    ,
      id: "28"
      invdate: "2007-10-03"
      name: "test2"
      note: "note2"
      amount: "300.00"
      tax: "20.00"
      total: "320.00"
    ,
      id: "29"
      invdate: "2007-09-01"
      name: "test3"
      note: "note3"
      amount: "400.00"
      tax: "30.00"
      total: "430.00"
    ]

    $grid = $("#demoGrid")
    gboxId = "gbox_" + $grid.attr("id")
    $gbox = $("#" + gboxId)

    $grid.jqGrid
      data: mydata
      datatype: "local"
      height: 250
      rowNum: 10
      rowList: [10, 20, 30]

      #colNames:['Inv No','Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
      colModel: [
        name: "edit_actions"
        label: " "
        width: 20
        sortable: false
        search: false
        hidedlg: true
        formatter: editColFormatter
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
      pager: "#gridPager"
      viewrecords: true
      hidegrid: false
      altRows: true
      shrinkToFit: false
      autowidth: true
      height: "100%"
      sortable: true #allows column reposition
      multiselect: true #one or more row selections
      beforeSelectRow: beforeSelectRow
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
    beforeSelectRow = (rowid, e) ->
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

controllers = angular.module("angleGrinder.controllers")
controllers.controller("JqGridBasicCtrl", JqGridBasicCtrl)
