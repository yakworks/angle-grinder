class ListCtrl

  @$inject = ["$scope", "Resource", "singlePageCrudCtrlMixin", "massUpdateMixin"]
  constructor: ($scope, Resource, singlePageCrudCtrlMixin, massUpdateMixin) ->

    $scope.gridOptions =
      path: "/org/list?format=json"
      colModel: @colModel()
      multiselect: true
      shrinkToFit: true # makes columns fit to width
      sortname: "num"
      sortorder: "asc"

      rowNum: 5
      rowList: [5, 10, 20]

    singlePageCrudCtrlMixin $scope,
      Resource: Resource
      resourcePath: "/org"
      gridName: "orgGrid"

    massUpdateMixin $scope,
      templateUrl: "/templates/org/massUpdateForm.html"
      controller: "org.MassUpdateFormCtrl"
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
      { name: "id", label: "ID", width: 30, fixed: true, formatter: showActionLink }
      { name: "name", label: "Name (right aligned)", width: 150, fixed: true, formatter: showLink }
      { name: "name", label: "Name", width: 100, fixed: true, formatter: showActionLink }
      { name: "num", label: "Num", width: 70 }
      { name: "addressDate", label: "Address date", width: 100 }
      { name: "timeZone", label: "Time Zone", width: 100 }
    ]

angular.module("angleGrinder")
  .controller("org.ListCtrl", ListCtrl)
