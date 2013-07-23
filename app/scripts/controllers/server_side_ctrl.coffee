class ServerSideCtrl
  @$inject = ["$scope", "$log", "$dialog", "confirmationDialog", "editDialog", "Users", "pathWithContext"]
  constructor: ($scope, $log, $dialog, confirmationDialog, editDialog, Users, pathWithContext) ->
    # TODO intitially show the form
    $scope.showSearchForm = true

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"

    $scope.editDialog = (id) ->
      Users.get { id: id }, (user) ->
        editDialog.open(pathWithContext("templates/partials/user_form.html"), user)

    $scope.createDialog = ->
      user = new Users()
      editDialog.open(pathWithContext("templates/partials/user_form.html"), user)

    $scope.deleteItem = (id) ->
      confirmationDialog.open().then (confirmed) ->
        return unless confirmed

        user = new Users(id: id)
        user.delete
          success: (response) -> $scope.$broadcast "itemDeleted", response
          error: (response) -> $log.error "Something went wront", response

    $scope.quickSearch = (search) ->
      $scope.$broadcast "searchUpdated", search

  gridColumns: ->
    [
      name: "id"
      width: 50
      formatter: "editActionLink"
    ,
      name: "login"
      label: "Login"
      formatter: "editActionLink"
    ,
      name: "name"
      label: "Name"
      formatter: "editActionLink"
    ,
      name: "allowance"
      label: "Allowance"
    ,
      name: "birthday"
      label: "Birthday"
    ,
      name: "paid"
      label: "Paid"
    ]

class SearchFormCtrl
  @$inject = ["$scope", "$rootScope", "$element"]
  constructor: ($scope, $rootScope, $element) ->
    # Open the select2 component
    $scope.openOrgSelect = -> $element.find("#orgSelect2").select2("open")

    $scope.orgSelectConfig =
      width: "resolve"
      dropdownCss: width: "400px"
      minimumInputLength: 1
      ajax:
        url: "/api/orgs.json"
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

angular.module("angleGrinder")
  .controller("ServerSideCtrl", ServerSideCtrl)
  .controller("SearchFormCtrl", SearchFormCtrl)
