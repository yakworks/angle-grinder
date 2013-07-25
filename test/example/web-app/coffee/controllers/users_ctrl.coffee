class UsersListCtrl

  @$inject = ["$scope", "$log", "confirmationDialog", "editDialog", "Resource", "pathWithContext"]
  constructor: ($scope, $log, confirmationDialog, editDialog, Resource, pathWithContext) ->
    colModel = [
      { name: "id", label: "ID", width: 30 }
      { name: "contact.name", label: "Contact Name", width: 100, formatter: "editActionLink" }
      { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" }
      { name: "login", label: "Login", width: 70 }
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ]

    $scope.gridOptions =
      url: pathWithContext("/userAdmin/list.json")
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
      user = new Resource(orgId: 1)

      editDialog.open(pathWithContext("userAdmin/formTemplate"), user)

    # Displays a form for editing an exiting user
    $scope.editDialog = (id) ->
      Resource.get { id: id }, (user) ->
        editDialog.open(pathWithContext("/userAdmin/formTemplate"), user)

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        item = new Resource(id: id)
        item.delete
          success: (response) -> $scope.$broadcast "itemDeleted", item
          error: (response) -> $log.error "Something went wront", response

class UsersSearchFormCtrl

  @$inject = ["$scope", "$element", "pathWithContext"]
  constructor: ($scope, $element, pathWithContext) ->
    # Open the select2 component
    $scope.openOrgSelect = -> $element.find("#orgSelect2").select2("open")

    $scope.orgSelectConfig =
      width: "resolve"
      dropdownCss: width: "400px"
      minimumInputLength: 1
      ajax:
        url: pathWithContext("/org/pickList")
        quietMillis: 500 # Number of milliseconds to wait for the user to stop typing before issuing the ajax request
        data: (term, page) ->
          # query params go here
          q: term # search term
          max: 20
          page: page
          sort: "name"
          order: "asc"
        results: (res, page) ->
          more = page < res.total
          list = $.map res.rows, (n) ->
            id: n.id, num: n.num, name: n.name
          results: list, more: more
      formatResult: (item) ->
        """
        <table class="table table-condensed" style="margin-bottom:0">
          <tr>
            <td style="width:60px;border-top:none">#{item.num}</td>
            <td style="border-top:none">#{item.name}</td>
          </tr>
        <table>
        """
      formatSelection: (item) -> item.name
      escapeMarkup: (m) -> m

angular.module("admin")
  .controller("UsersListCtrl", UsersListCtrl)
  .controller("SearchFormCtrl", UsersSearchFormCtrl)
