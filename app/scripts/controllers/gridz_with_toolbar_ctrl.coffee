class GridzWithToolbarCtrl

  constructor: ->
    custFormatter = (cellValue, colOptions, rowObject) ->
      """
      <a class="" title="" data-toggle="popover" href="#" >#{cellValue}&nbsp;&nbsp;</a><i class="icon-zoom-in" style="font-size:11px;color:#777"></i>
      """

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

    $grid = $("#demoGrid")

    $grid.gridz
      data: sampleData
      datatype: "local"
      colModel: columns

    $grid.data("gridz")

    $grid.on "editAction", (e, rowId, gridObject) ->
      $grid.jqGrid "editGridRow", rowId,
        reloadAfterSubmit: false

controllers = angular.module("angleGrinder.controllers")
controllers.controller("GridzWithToolbarCtrl", GridzWithToolbarCtrl)
