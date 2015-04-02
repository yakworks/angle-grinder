class ListCtrl

  @$inject = ["$scope", "$log", "Resource", "$filter", "dialogCrudCtrlMixin"]
  constructor: ($scope, $log, Resource, @$filter, dialogCrudCtrlMixin) ->

    $scope.gridOptions =
      path: "/user/list?format=json"
      colModel: @colModel()
      multiselect: false # turn off multiselect
      shrinkToFit: true # makes columns fit to width
      sortname: "login"
      sortorder: "asc"

    dialogCrudCtrlMixin $scope,
      Resource: Resource
      gridName: "usersGrid"
      templateUrl: "/user/formTemplate"
      beforeEdit: (record) ->
        user = angular.copy(record)
        # convert `Contact.type` enum field to the string
        user.contact.type = record.contact.type?.name
        user

  colModel: ->
    [
      { name: "id", label: "ID", width: 30, fixed: true }
      { name: "contact.name", label: "Contact Name", width: 100, fixed: true, formatter: "editActionLink" }
      { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" }
      { name: "login", label: "Login", width: 70 }
      { name: "activeDate", label: "Active Date", width: 70, formatter: (cellVal) => @$filter("date")(cellVal) }
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ]

angular.module("angleGrinder")
  .controller("user.ListCtrl", ListCtrl)
