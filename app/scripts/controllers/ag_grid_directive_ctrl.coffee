class AgGridDirectiveCtrl

  @$inject = ["$scope", "sampleData"]
  constructor: ($scope, sampleData) ->
    $scope.gridOptions =
      data: sampleData(100)
      datatype: "local"
      colModel: @gridColumns()

  gridColumns: ->
    [
      name: "id"
      label: "Inv No"
      width: 60
      sorttype: "int"
    ,
      name: "customer.name"
      label: "Customer"
    ,
      name: "invdate"
      label: "Date"
    ,
      name: "note"
      label: "Note"
    ]

controllers = angular.module("angleGrinder.controllers")
controllers.controller("AgGridDirectiveCtrl", AgGridDirectiveCtrl)
