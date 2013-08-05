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
  @$inject = ["$scope"]
  constructor: ($scope) ->
    $scope.orgSelectConfig =
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
        results: (result, page) ->
          more = page < result.total
          list = _.map result.rows, (n) ->
            id: n.id, num: n.num, name: n.name
          results: list, more: more

angular.module("angleGrinder")
  .controller("ServerSideCtrl", ServerSideCtrl)
  .controller("SearchFormCtrl", SearchFormCtrl)
