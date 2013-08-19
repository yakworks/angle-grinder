class ContactListCtrl

  @$inject = ["$scope", "editDialog", "resourceBuilder", "pathWithContext"]
  constructor: ($scope, editDialog, resourceBuilder, pathWithContext) ->
    # Create resource for users (contacts)
    Users = resourceBuilder("/user")

    gridInitialized = false
    $scope.$on "initContactsGrid", (event, org) =>
      return if gridInitialized
      gridInitialized = true
      
      $scope.gridOptions =
        url: pathWithContext("/org/listUsers/#{org.id}.json")
        colModel: @colModel()
        multiselect: false # turn off multiselect
        shrinkToFit: true # makes columns fit to width
        autowidth: true
        sortname: "login"
        sortorder: "asc"

    # Displays a form for editing an exiting user
    $scope.editItem = (id) ->
      Users.get { id: id }, (user) ->
        editDialog.open(pathWithContext("/user/formTemplate"), user)

  colModel: ->
    [
      { name: "id", label: "ID", width: 30 }
      { name: "contact.name", label: "Contact Name", width: 100, formatter: "editActionLink" }
      { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" }
      { name: "login", label: "Login", width: 70 }
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ]

angular.module("angleGrinder")
  .controller("tabbedOrg.ContactListCtrl", ContactListCtrl)
