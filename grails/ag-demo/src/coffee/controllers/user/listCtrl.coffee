class ListCtrl

  @$inject = ["$scope", "$log", "Resource", "$filter", "dialogCrudCtrlMixin", "pathWithContext", "$http", 'uiGridConstants']
  constructor: ($scope, $log, Resource, @$filter, dialogCrudCtrlMixin, pathWithContext, $http, uiGridConstants) ->

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
        # saves data from server to compare retrieved data and data that will be send to the server
        $scope.tzShowCase = angular.copy(record)
        user = angular.copy(record)
        # convert `Contact.type` enum field to the string
        user.contact.type = record.contact.type?.name
        user

    # UI-grid test example
    listPath = pathWithContext("/user/list?format=json")

    paginationOptions =
      pageNumber: 1
      pageSize: 20
      sort: null
      order: null

    $scope.gridOptionsUI =
      enableColumnResizing: true
      columnDefs: @UiGridColModel()
      useExternalSorting: true
      paginationPageSizes: [10, 20, 50],
      paginationPageSize: 20,
      useExternalPagination: true,

    $scope.gridOptionsUI.onRegisterApi = (gridApi) ->
      $scope.gridApi = gridApi
      $scope.gridApi.edit.on.afterCellEdit $scope, (rowEntity, colDef, newValue, oldValue) ->
        console.log rowEntity
        $http.post(pathWithContext("/user/update/#{rowEntity.id}"), rowEntity)
        alert 'Column: ' + colDef.name + ' ID: ' + rowEntity.id
      $scope.gridApi.core.on.sortChanged $scope, (grid, sortColumns) ->
        if sortColumns.length == 0
          paginationOptions.sort = null
          paginationOptions.order = null
        else
          paginationOptions.sort = sortColumns[0].field
          paginationOptions.order = sortColumns[0].sort.direction
        getPage()
      gridApi.pagination.on.paginationChanged $scope, (newPage, pageSize) ->
        paginationOptions.pageNumber = newPage
        paginationOptions.pageSize = pageSize
        getPage()

    getPage = (params={}) ->
      params.page = paginationOptions.pageNumber
      params.max = paginationOptions.pageSize
      params.sort = paginationOptions.sort
      params.order = paginationOptions.order
      $http(url:listPath, type:'GET', params: params).success (resp) ->
        $scope.gridOptionsUI.totalItems = resp.records
        $scope.gridOptionsUI.data = resp.rows

    getPage()

  colModel: ->
    [
      { name: "id", label: "ID", width: 30, fixed: true }
      { name: "contact.name", label: "Contact Name", width: 100, fixed: true, formatter: "editActionLink" }
      { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" }
      { name: "login", label: "Login", width: 70 }
      { name: "activeDate", label: "Active Date", width: 70, formatter: (cellVal) => @$filter("date")(cellVal) }
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ]
  link: (fieldName) ->
    "<a ng-click='grid.appScope.editRecord(row.entity[\"id\"])'  href='#'>{{COL_FIELD}}</a>"

  UiGridColModel: ->
    [
      { field: "id", name: "ID", width: 30, enableColumnResizing: false, cellFilter: "number"}
      { field: "contact.name", name: "Contact Name", cellTemplate: @link()}
      { field: "contact.email", name: "Contact Email",  align: "right" }
      # grid.appScope - the way how we can get apllication scope. For some reason doesn't work for composit fields, for example "contact.name"
      { field: "login", name: "Login", cellTemplate: @link()}
      { field: "activeDate", name: "Active Date",  cellFilter: "agDate" }
      #just an example how we can use cellTemplate, in this case it would be better to create an filter
      { field: "inactive", name: "Inactive", align: "center", cellTemplate: "<span>{{row.entity[col.field]?'+':'-'}}</span>" }
    ]

angular.module("angleGrinder")
  .controller("user.ListCtrl", ListCtrl)
