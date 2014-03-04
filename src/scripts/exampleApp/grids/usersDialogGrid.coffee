grids = angular.module "exampleApp.grids"

grids.factory "usersDialogGrid", [
  "$log", "$filter", ($log, $filter) ->

    colModel = ->
      [
        name: "id"
        width: 50
        formatter: "editActionLink"
      ,
        name: "login"
        label: "Login"
        formatter: "editActionLink"
      ,
        name: "info.email"
        label: "Email"
      ,
        name: "name"
        label: "Name"
        formatter: "editActionLink"
      ,
        name: "birthday"
        label: "Birthday",
        formatter: (cellVal) -> $filter("date")(cellVal)
      ,
        name: "creditInfo.allowance"
        label: "Allowance"
      ,
        name: "creditInfo.paid"
        label: "Paid"
      ]

    (options = {}) ->
      defaults =
        path: "/api/users"
        colModel: colModel()
        rowNum: 10
        sortname: "id"

        # handler for jqGrid errors
        loadError: -> $log.error "loadError", arguments

      _.extend(defaults, options)
]
