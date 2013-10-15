class ListCtrl

  @$inject = ["$scope", "pathWithContext", "Resource", "confirmationDialog", "massUpdateDialog"]
  constructor: ($scope, pathWithContext, Resource, confirmationDialog, massUpdateDialog) ->
    $scope.gridOptions =
      url: pathWithContext("/org/list.json")
      colModel: @colModel()
      multiselect: true
      shrinkToFit: true # makes columns fit to width
      sortname: "num"
      sortorder: "asc"

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        promise = Resource.delete(id: id).$promise
        promise.then (response) -> $scope.orgGrid.removeRow(response.id)

    $scope.massUpdate = massUpdateDialog(
      grid: -> $scope.orgGrid
      controller: -> "org.MassUpdateFormCtrl"
      templateUrl: -> "/templates/org/massUpdateForm.html"
    )

  colModel: ->
    showActionLink = (cellVal, options, rowdata) ->
      """
        <a href="#/#{rowdata.id}">#{cellVal}</a>
      """

    [
      { name: "id", label: "ID", width: 30, fixed: true, formatter: showActionLink }
      { name: "name", label: "Name", width: 100, fixed: true, formatter: showActionLink }
      { name: "num", label: "Num", width: 70 }
      { name: "timeZone", label: "Time Zone", width: 100 }
    ]

angular.module("angleGrinder")
  .controller("org.ListCtrl", ListCtrl)
