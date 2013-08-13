class ShowDetailsCtrl

  @$inject = ["$scope", "$location", "pathWithContext", "org"]
  constructor: ($scope, $location, pathWithContext, org) ->
    $scope.org = org

    $scope.initGrid = ->
      $scope.gridOptions =
        url: pathWithContext("/user/list.json")
        colModel: [
          { name: "id", label: "ID", width: 30 }
          { name: "contact.name", label: "Contact Name", width: 100, formatter: "editActionLink" }
          { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" }
          { name: "login", label: "Login", width: 70 }
          { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
        ]
        multiselect: false # turn off multiselect
        shrinkToFit: true # makes columns fit to width
        autowidth: true
        sortname: "login"
        sortorder: "asc"

    $scope.delete = (org) ->
      $scope.deleting = true

      callback = ->
        $scope.deleting = false
        $location.path("/")

      org.delete success: callback, error: callback

angular.module("angleGrinder")
  .controller("org.ShowDetailsCtrl", ShowDetailsCtrl)
