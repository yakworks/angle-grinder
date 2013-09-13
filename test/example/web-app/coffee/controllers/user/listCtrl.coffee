class ListCtrl

  @$inject = ["$scope", "$log", "$filter", "confirmationDialog", "editDialog", "Resource", "pathWithContext"]
  constructor: ($scope, $log, @$filter, confirmationDialog, editDialog, Resource, pathWithContext) ->
    $scope.gridOptions =
      url: pathWithContext("/user/list.json")
      colModel: @colModel()
      multiselect: false # turn off multiselect
      shrinkToFit: true # makes columns fit to width
      sortname: "login"
      sortorder: "asc"

    # Displays a form for creating a new user
    $scope.createItem = ->
      console.log $scope.usersGrid
      user = new Resource()
      editDialog.open(pathWithContext("/user/formTemplate"), user, $scope.usersGrid)

    # Displays a form for editing an exiting user
    $scope.editItem = (id) ->
      Resource.get { id: id }, (record) ->
        # convert `Contact.type` enum field to string
        user = angular.copy(record)
        user.contact.type = record.contact.type?.name

        editDialog.open(pathWithContext("/user/formTemplate"), user, $scope.usersGrid)

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        promise = Resource.delete(id: id).$promise
        promise.then (response) -> $scope.usersGrid.removeRow(response.id)

  colModel: ->
    [
      { name: "id", label: "ID", width: 30, fixed: true }
      { name: "contact.name", label: "Contact Name", width: 100, fixed: true, formatter: "editActionLink" }
      { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" }
      { name: "login", label: "Login", width: 70 }
      { name: "activeDate", label: "Active Date", width: 70, formatter: (cellVal) => @$filter("date")(cellVal) }
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ]

class SearchForm

  @$inject = ["$scope"]
  constructor: ($scope) ->
    $scope.search = contact: type: []

    $scope.contactTypeSelectOptions =
      multiple: true
      simple_tags: true
      tags: ["admin", "customer"]

angular.module("angleGrinder")
  .controller("user.ListCtrl", ListCtrl)
  .controller("user.SearchForm", SearchForm)
