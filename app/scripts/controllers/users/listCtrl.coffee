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

    # TODO work in progress, this is only a
    # Toggle `allowance` column
    $scope.toggleAllowance = ->
      $grid = $("#grid")

      if $scope.isHidden "allowance"
        $grid.jqGrid("showCol", "allowance")
      else
        $grid.jqGrid("hideCol", "allowance")

      $grid.trigger("resize")

    # Return `true` if a columnt with the given id is hidden
    $scope.isHidden = (columnId) ->
      colModel = $("#grid").jqGrid("getGridParam", "colModel")
      column = _.findWhere(colModel, name: columnId)
      column?.hidden

  gridColumns: ->
    showActionLink = (cellVal, options, rowdata) ->
      """
      <a href="#/users/#{rowdata.id}">#{cellVal}</a>
      """

    [
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

angular.module("angleGrinder")
  .controller("users.ListCtrl", ListCtrl)
