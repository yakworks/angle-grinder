class ServerSideCtrl
  @$inject = ["$scope", "$log", "$dialog", "confirmationDialog", "editDialog", "Users", "pathWithContext"]
  constructor: ($scope, $log, $dialog, confirmationDialog, editDialog, Users, pathWithContext) ->
    # intitially show the form
    $scope.showSearchForm = true

    $scope.gridOptions =
      url: pathWithContext("/api/users")
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"

    $scope.editItem = (id) ->
      Users.get { id: id }, (user) ->
        editDialog.open(pathWithContext("templates/partials/user_form.html"), user)

    $scope.createItem = ->
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

angular.module("angleGrinder")
  .controller("ServerSideCtrl", ServerSideCtrl)
  .controller("SearchFormCtrl", SearchFormCtrl)
