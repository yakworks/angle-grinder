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
      data: sampleData.generate(100)
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
      name: "invoiceDate"
      index: "invoiceDate"
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

angular.module("angleGrinder")
  .controller("JqGridBasicCtrl", JqGridBasicCtrl)
