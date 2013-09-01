class ListCtrl

  @$inject = ["$scope", "$log", "confirmationDialog", "editDialog", "Resource", "pathWithContext"]
  constructor: ($scope, $log, confirmationDialog, editDialog, Resource, pathWithContext) ->
    $scope.gridOptions =
      url: pathWithContext("/user/list.json")
      colModel: @colModel()
      multiselect: false # turn off multiselect
      shrinkToFit: true # makes columns fit to width
      sortname: "login"
      sortorder: "asc"

    # Handles quickSearch action
    $scope.quickSearch = (search) ->
      $scope.$broadcast "searchUpdated", search

    # Displays a form for creating a new user
    $scope.createItem = ->
      user = new Resource()
      editDialog.open(pathWithContext("/user/formTemplate"), user)

    # Displays a form for editing an exiting user
    $scope.editItem = (id) ->
      Resource.get { id: id }, (record) ->
        # convert `Contact.type` enum field to string
        user = angular.copy(record)
        user.contact.type = record.contact.type?.name

        editDialog.open(pathWithContext("/user/formTemplate"), user)

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        item = new Resource(id: id)
        item.delete
          success: (response) -> $scope.$broadcast "itemDeleted", item
          error: (response) -> $log.error "Something went wront", response

  colModel: ->
    [
      { name: "id", label: "ID", width: 30, fixed: true }
      { name: "contact.name", label: "Contact Name", width: 100, fixed: true, formatter: "editActionLink" }
      { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" }
      { name: "login", label: "Login", width: 70 }
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ]

angular.module("angleGrinder")
  .controller("user.ListCtrl", ListCtrl)
