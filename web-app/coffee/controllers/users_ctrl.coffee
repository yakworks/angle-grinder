class UsersListCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->
    colModel = [
      { name: "id", width: 30 }
      { name: "contact.name", width: 100, formatter: "editActionLink" }
      { name: "login", width: 70 }
      { name: "contact.email", width: 70, align: "right", formatter: "email" }
      { name: "inactive", width: 30, align: "center", formatter: "okIcon" }
    ]

    $scope.gridOptions =
      url: "/example/userAdmin/list.json"
      colModel: colModel
      multiselect: false # turn off multiselect
      shrinkToFit: true # makes columns fit to width
      sortname: "login"
      sortorder: "asc"

# TODO implement it
class UsersSearchFormCtrl

  @$inject = ["$scope"]
  constructor: ($scope) ->

angular.module("admin")
  .controller("UsersListCtrl", UsersListCtrl)
  .controller("SearchFormCtrl", UsersSearchFormCtrl)
