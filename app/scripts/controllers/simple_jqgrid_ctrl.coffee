class SimpleJqGridCtrl

  @$inject = ["sampleData"]
  constructor: (sampleData) ->
    $grid = $("#demoGrid")

    $grid.jqGrid
      data: sampleData(200)
      datatype: "local"
      rowNum: 10
      rowList: [10, 20, 30]

      colModel: [
        name: "id"
        index: "id"
        label: "Inv No"
        key: true
        width: 60
        sorttype: "int"
        search: true
      ,
        name: "name"
        index: "name"
        label: "Inv No"
        width: 200
        editable: true
      ,
        name: "invdate"
        index: "invdate"
        label: "Date"
        editable: true
        width: 90
        sorttype: "date"
        formatter: "date"
        editoptions:
          dataInit: (el) ->
            $(el).datepicker()
      ,
        name: "amount"
        index: "amount"
        width: 80
        align: "right"
        sorttype: "float"
        formatter: "number"
        editable: true
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
        editable: true
      ]

      pager: "#gridPager"
      viewrecords: true
      hidegrid: false
      altRows: true
      shrinkToFit: false
      autowidth: true
      height: "100%"
      sortable: true # allows column reposition
      multiselect: true # one or more row selections

controllers = angular.module("angleGrinder.controllers")
controllers.controller("SimpleJqGridCtrl", SimpleJqGridCtrl)
