class UsersListCtrl

  @$inject = ["$scope", "$log", "confirmationDialog", "editDialog", "Grails"]
  constructor: ($scope, $log, confirmationDialog, editDialog, Grails) ->
    colModel = [
      { name: "id", label: "ID", width: 30 }
      { name: "contact.name", label: "Contact Name", width: 100, formatter: "editActionLink" }
      { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" }
      { name: "login", label: "Login", width: 70 }
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ]

    $scope.gridOptions =
      url: "/example/userAdmin/list.json"
      colModel: colModel
      multiselect: false # turn off multiselect
      shrinkToFit: true # makes columns fit to width
      sortname: "login"
      sortorder: "asc"

    # Handles quickSearch action
    $scope.quickSearch = (search) ->
      $scope.$broadcast "searchUpdated", search

    # Displays a form for creating a new user
    $scope.createDialog = ->
      # TODO workaround for missing Org
      user = new Grails(orgId: 1)

      editDialog.open("userAdmin/formTemplate", user)

    # Displays a form for editing an exiting user
    $scope.editDialog = (id) ->
      Grails.get { id: id }, (user) ->
        editDialog.open("userAdmin/formTemplate", user)

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        item = new Grails(id: id)
        item.delete
          success: (response) -> $scope.$broadcast "itemDeleted", item
          error: (response) -> $log.error "Something went wront", response

class UsersSearchFormCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->

angular.module("admin")
  .controller("UsersListCtrl", UsersListCtrl)
  .controller("SearchFormCtrl", UsersSearchFormCtrl)
