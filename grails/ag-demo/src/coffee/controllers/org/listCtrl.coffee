class ListCtrl

  @$inject = ["$scope", "Resource", "singlePageCrudCtrlMixin", "massUpdateMixin"]
  constructor: ($scope, Resource, singlePageCrudCtrlMixin, massUpdateMixin) ->

    $scope.gridOptions =
      path: "/org/list.json"
      colModel: @colModel()
      multiselect: true
      shrinkToFit: true # makes columns fit to width
      sortname: "num"
      sortorder: "asc"

    singlePageCrudCtrlMixin $scope,
      Resource: Resource
      resourcePath: "/org"
      gridName: "orgGrid"

    massUpdateMixin $scope,
      templateUrl: "/templates/org/massUpdateForm.html"
      controller: "org.MassUpdateFormCtrl"
      gridName: "orgGrid"

  colModel: ->
    showActionLink = (cellVal, options, rowData) ->
      """
        <a class="with-pager" href="#" data-row-id="#{rowData.id}" data-ui-sref="show">#{cellVal}</a>
      """

    [
      { name: "id", label: "ID", width: 30, fixed: true, formatter: showActionLink }
      { name: "name", label: "Name", width: 100, fixed: true, formatter: showActionLink }
      { name: "num", label: "Num", width: 70 }
      { name: "timeZone", label: "Time Zone", width: 100 }
    ]

angular.module("angleGrinder")
  .controller("org.ListCtrl", ListCtrl)
