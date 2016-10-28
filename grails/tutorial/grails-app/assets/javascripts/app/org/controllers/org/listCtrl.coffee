class ListCtrl

  @$inject = ["$scope", "Resource", "SinglePageCrudCtrlMixin", "MassUpdateMixin", "$filter"]
  constructor: ($scope, Resource, SinglePageCrudCtrlMixin, MassUpdateMixin, @$filter) ->
    $scope.gridOptions =
      path: "/api/orgs"
      colModel: @colModel()
      multiselect: true
      shrinkToFit: true # makes columns fit to width
      sortname: "name"
      sortorder: "asc"

      rowNum: 5
      rowList: [5, 10, 20]

    SinglePageCrudCtrlMixin $scope,
      Resource: Resource
      resourcePath: "/api/orgs"
      gridName: "orgGrid"

  colModel: ->
    showActionLink = (cellVal, options, rowdata) ->
      """
        <a href="#/#{rowdata.id}">#{cellVal}</a>
      """

    showLink = (cellVal, options, rowdata) ->
      content = """
        <a href="#/#{rowdata.id}">#{cellVal}</a>
      """
      window.columnAligner("link", content)

    [
      { name: "id", label: "ID", width: 50, fixed: true, formatter: showActionLink }
      { name: "name", label: "Name", width: 200, fixed: true, formatter: showActionLink }
      { name: "registrationDate", label: "Reg Date", width: 200, fixed: true, formatter: (cellVal) =>  if(cellVal) then @$filter("date")(cellVal) else "" }
      { name: "orgType", label: "Type", width: 100}
    ]

angular.module("angleGrinder")
  .controller("org.ListCtrl", ListCtrl)
