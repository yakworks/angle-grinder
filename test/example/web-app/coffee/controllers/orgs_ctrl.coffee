class OrgsListCtrl

  @$inject = ["$scope", "pathWithContext"]
  constructor: ($scope, pathWithContext) ->
    colModel = [
      { name: "id", label: "ID", width: 30 }
      { name: "name", label: "Name", width: 100 }
      { name: "num", label: "Num", width: 70 }
    ]

    $scope.gridOptions =
      url: pathWithContext("/org/list.json")
      colModel: colModel
      multiselect: false # turn off multiselect
      shrinkToFit: true # makes columns fit to width
      sortname: "num"
      sortorder: "asc"

angular.module("angleGrinder")
  .controller("OrgsListCtrl", OrgsListCtrl)
