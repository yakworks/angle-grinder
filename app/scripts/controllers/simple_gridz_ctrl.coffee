class SimpleGridzCtrl

  @$inject = ["sampleData"]
  constructor: (sampleData) ->
    $grid = $("#demoGrid")

    $grid.gridz
      data: sampleData.generate(200)
      datatype: "local"
      colModel: @gridColumns()

    gridz = $grid.data("gridz")
    $grid.on "editAction", (e, rowId, gridObject) ->
      $grid.jqGrid "editGridRow", rowId,
        reloadAfterSubmit: false

  custFormatter: (cellValue, colOptions, rowObject) ->
    """
    <a class="" title="" data-toggle="popover" href="#" >#{cellValue}&nbsp;&nbsp;</a><i class="icon-zoom-in" style="font-size:11px;color:#777"></i>
    """

  gridColumns: ->
    [
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
      formatter: @custFormatter
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

angular.module("angleGrinder")
  .controller("SimpleGridzCtrl", SimpleGridzCtrl)
