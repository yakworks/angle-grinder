class ContactListCtrl

  @$inject = ["$scope", "editDialog", "confirmationDialog", "resourceBuilder", "pathWithContext"]
  constructor: ($scope, editDialog, confirmationDialog, resourceBuilder, pathWithContext) ->
    # Create resource for users (contacts)
    Users = resourceBuilder("/user")

    $scope.$org = null
    gridInitialized = false
    $scope.$on "initContactsGrid", (event, org) =>
      return if gridInitialized

      $scope.$org = org
      gridInitialized = true
      
      $scope.gridOptions =
        url: pathWithContext("/org/listUsers/#{org.id}.json")
        colModel: @colModel()
        multiselect: false # turn off multiselect
        shrinkToFit: true # makes columns fit to width
        autowidth: true
        sortname: "login"
        sortorder: "asc"

    # Handles quickSearch action
    $scope.quickSearch = (search) ->
      $scope.$broadcast "searchUpdated", search

    # Displays a form for creating a new user
    $scope.createItem = ->
      user = new Users(contact: org: $scope.$org)
      editDialog.open(pathWithContext("/user/formTemplate"), user)

    # Displays a form for editing an exiting user
    $scope.editItem = (id) ->
      Users.get { id: id }, (user) ->
        editDialog.open(pathWithContext("/user/formTemplate"), user)

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        item = new Users(id: id)
        item.delete
          success: (response) -> $scope.$broadcast "itemDeleted", item
          error: (response) -> $log.error "Something went wront", response

  colModel: ->
    [
      { name: "id", label: "ID", width: 30 }
      { name: "contact.name", sortable: false, label: "Contact Name", width: 100, formatter: "editActionLink" }
      { name: "contact.email", sortable: false, label: "Contact Email", width: 70, align: "right", formatter: "email" }
      { name: "login", label: "Login", width: 70 }
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ]

angular.module("angleGrinder")
  .controller("tabbedOrg.ContactListCtrl", ContactListCtrl)
