class ListCtrl
  @$inject = ["$scope", "$location", "$filter", "pathWithContext"]
  constructor: ($scope, $location, @$filter, pathWithContext) ->

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      shrinkToFit: true
      rowNum: 10
      sortname: "id"
      multiselect: false

    $scope.showItem = (id) ->
      $location.path("/users/#{id}")

    $scope.editItem = (id) ->
      $location.path("/users/#{id}/edit")

  gridColumns: ->
    showActionLink = (cellVal, options, rowdata) ->
      """
      <a href="#/users/#{rowdata.id}">#{cellVal}</a>
      """

    defaultColModel = [
      name: "id"
      width: 50
      formatter: showActionLink
    ,
      name: "login"
      label: "Login"
      formatter: showActionLink
    ,
      name: "name"
      label: "Name"
      formatter: showActionLink
    ,
      name: "allowance"
      label: "Allowance"
      hidden: true
    ,
      name: "birthday"
      label: "Birthday",
      formatter: (cellVal) => @$filter("date")(cellVal)
    ,
      name: "paid"
      label: "Paid"
    ]

    # TODO wrap into module
    # TODO handle JSON parse errors (fallback to the default colModel)
    choosedColumns = window.localStorage.getItem("gridz.usersGrid.choosedColumns")
    if choosedColumns?
      # ...column model was persisted, parse it and extend the default column model
      choosedColumns = angular.fromJson(choosedColumns)

      colModel = []
      for choosedColumn in choosedColumns
        column = _.findWhere(defaultColModel, name: choosedColumn.name)
        if column?
          # show / hide the column
          column.hidden = choosedColumn.hidden
          # put it in the valid order
          colModel.push(column)

      colModel
    else
      # ...just return default column model
      defaultColModel

angular.module("angleGrinder")
  .controller("users.ListCtrl", ListCtrl)
