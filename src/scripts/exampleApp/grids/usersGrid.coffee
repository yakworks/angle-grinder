grids = angular.module "exampleApp.grids"

grids.factory "usersGrid", [
  "$filter", ($filter) ->

    showActionLink = (cellVal, options, rowdata) ->
      """
      <a class="with-pager" href="#/examples/users/#{rowdata.id}">#{cellVal}</a>
      """

    colModel = ->
      [
        name: "id"
        width: 50
        formatter: showActionLink
      ,
        name: "login"
        label: "Login"
        formatter: showActionLink
      ,
        name: "info.email"
        label: "Email"
      ,
        name: "name"
        label: "Name"
        formatter: showActionLink
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
        rowList: [10, 20, 50, 100, 1000]
        sortname: "id"
        multiselect: true

      _.extend(defaults, options)
]
