grids = angular.module "exampleApp.grids"

grids.factory "exampleGrid", [
  ->

    colModel = ->
      [
        name: "id"
        label: "Inv No"
        width: 60
        sorttype: "int"
        align: "right"
      ,
        name: "customer.name"
        label: "Customer"
        formatter: "editActionLink"
      ,
        name: "invoiceDate"
        label: "Date"
        width: 80
        formatter: "date"
      ,
        name: "note"
        label: "Note"
      ,
        name: "complete"
        label: "Complete"
        width: 80
        fixed: true
        align: "center"
        formatter: "okIcon"
      ]

    (options = {}) ->
      defaults =
        datatype: "local"
        colModel: colModel()
        sortname: "id"
        shrinkToFit: true

      _.extend(defaults, options)
]
