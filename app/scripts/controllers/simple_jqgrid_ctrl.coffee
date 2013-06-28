class SimpleJqGridCtrl

  constructor: ->
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

    $grid.jqGrid
      data: mydata
      datatype: "local"
      height: 250
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
      sortable: true #allows column reposition
      multiselect: true #one or more row selections

controllers = angular.module("angleGrinder.controllers")
controllers.controller("SimpleJqGridCtrl", SimpleJqGridCtrl)
