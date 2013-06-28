$ ->
  #use regex to get anchor(==selector)
  #get anchor
  #load content for selected tab
  #reinitialize tabs
  custFormatter = (cellValue, colOptions, rowObject) ->
    """
    <a class="" title="" data-toggle="popover" href="#" >#{cellValue} &nbsp;&nbsp;</a><i class="icon-zoom-in" style="font-size:11px;color:#777"></i>
    """

  $("#topbar").load "docs/navbar-top.html"
  $("#sidebar").load "docs/gridz-sidebar.html"
  $("#myTabs").bind "show", (e) ->
    pattern = /#.+/g
    contentID = e.target.toString().match(pattern)[0]
    $(contentID).load baseURL + contentID.replace("#", ""), ->
      $("#myTabs").tab()

  $grid = $("#demoGrid")
  columns = [
    name: "id"
    label: "Inv No"
    key: true
    width: 60
    align: "right"
    sorttype: "int"
    search: true
  ,
    name: "customer.name"
    label: "Customer"
    width: 250
    formatter: custFormatter
  ,
    name: "tranDate"
    label: "Date"
    editable: true
    width: 90
    sorttype: "date"
    formatter: "date"
  ,
    name: "description"
    width: 150
  ,
    name: "amount"
    width: 80
    align: "right"
    sorttype: "float"
    formatter: "number"
  ,
    name: "tax"
    width: 80
    align: "right"
    sorttype: "float"
  ,
    name: "total"
    width: 80
    align: "right"
    sorttype: "float"
  ,
    name: "note"
    width: 250
    sortable: false
    hidden: true
  ]

  $grid.gridz
    data: sampleData
    datatype: "local"
    colModel: columns

  gridz = $grid.data("gridz")
  $grid.on "editAction", (e, rowId, gridObject) ->
    $grid.jqGrid "editGridRow", rowId,
      reloadAfterSubmit: false
