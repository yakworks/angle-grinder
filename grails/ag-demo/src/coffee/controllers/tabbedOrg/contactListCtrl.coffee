class ContactListCtrl

  @$inject = ["$scope", "resourceBuilder", "dialogCrudCtrlMixin", ]
  constructor: ($scope, resourceBuilder, dialogCrudCtrlMixin) ->
    # Create resource for the users (contacts)
    Users = resourceBuilder("/user")

    $scope.$org = null
    gridInitialized = false
    $scope.$on "initContactsGrid", (event, org) =>
      return if gridInitialized

      $scope.$org = org
      gridInitialized = true

      $scope.gridOptions =
        path: "/org/listUsers/#{org.id}.json"
        colModel: @colModel()
        multiselect: false # turn off multiselect
        shrinkToFit: true # makes columns fit to width
        autowidth: true
        sortname: "login"
        sortorder: "asc"

    # TODO org for create action is missing
    # TODO figure out how to assign default values before create
    dialogCrudCtrlMixin $scope,
      Resource: Users
      gridName: "usersGrid"
      templateUrl: "/user/formTemplate"

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
