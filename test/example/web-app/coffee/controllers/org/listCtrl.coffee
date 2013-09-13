class ListCtrl

  @$inject = ["$scope", "$dialog", "pathWithContext", "Resource", "confirmationDialog"]
  constructor: ($scope, $dialog, pathWithContext, Resource, confirmationDialog) ->
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

    $scope.massUpdate = ->
      orgIds = $scope.orgGrid.getSelectedRowIds()
      return if orgIds.length is 0

      dialog = $dialog.dialog
        backdropFade: false
        dialogFade: false
        resolve:
          orgIds: -> orgIds
          orgGrid: -> $scope.orgGrid

      dialog.open(pathWithContext("/templates/org/massUpdateForm.html"), "org.MassUpdateFormCtrl")

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
