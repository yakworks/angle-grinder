class ShowCtrl

  @$inject = ["$scope", "$location", "sampleData", "user"]
  constructor: ($scope, $location, sampleData, user) ->
    $scope.user = user

    # TODO create a service for grid options
    # TODO dry it
    $scope.gridOptions =
      data: sampleData.generate(100)
      datatype: "local"
      colModel: @gridColumns()
      sortname: "id"
      shrinkToFit: true
      multiselect: false
      actionPopup: false

    $scope.delete = (user) ->
      onSuccess = -> $location.path("/users")
      user.delete success: onSuccess

  gridColumns: ->
    [
      name: "id"
      label: "Inv No"
      width: 60
      sorttype: "int"
      align: "right"
    ,
      name: "customer.name"
      label: "Customer"
      formatter: "editActionLink"
    ,
      name: "invoiceDate"
      label: "Date"
      width: 80
    ,
      name: "note"
      label: "Note"
    ,
      name: "complete"
      label: "Complete"
      width: 80
      fixed: true
      align: "center"
      formatter: "okIcon"
    ]

angular.module("exampleApp")
  .controller("users.ShowCtrl", ShowCtrl)
