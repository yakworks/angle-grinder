class ServerSideCtrl

  @$inject = ["$scope", "$log", "$dialog", "confirmationDialog", "editDialog", "Users"]
  constructor: ($scope, $log, $dialog, confirmationDialog, editDialog, Users) ->
    $scope.gridOptions =
      url: "/api/users"
      colModel: @gridColumns()
      rowNum: 10
      sortname: "id"

    $scope.editDialog = (id) ->
      Users.get { id: id }, (user) ->
        editDialog.open("templates/partials/user_form.html", user)

    $scope.createDialog = ->
      user = new Users()
      editDialog.open("templates/partials/user_form.html", user)

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

angular.module("angleGrinder")
  .controller("ServerSideCtrl", ServerSideCtrl)
