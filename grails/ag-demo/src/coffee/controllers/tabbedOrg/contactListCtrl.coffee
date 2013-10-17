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

    dialogCrudCtrlMixin $scope,
      Resource: Users
      gridName: "contactsGrid"
      templateUrl: "/user/formTemplate"
      beforeCreate: (user) ->
        user.contact =
          org: $scope.org
          type: "CUSTOMER"
        user

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
