/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class ListCtrl {
  static initClass() {
  
    this.$inject = ["$scope", "$log", "Resource", "$filter", "DialogCrudCtrlMixin", "pathWithContext", "$http", 'uiGridConstants'];
  }
  constructor($scope, $log, Resource, $filter, DialogCrudCtrlMixin, pathWithContext, $http, uiGridConstants) {

    this.$filter = $filter;
    $scope.gridOptions = {
      path: "/user/list?format=json",
      colModel: this.colModel(),
      multiselect: false, // turn off multiselect
      shrinkToFit: true, // makes columns fit to width
      sortname: "login",
      sortorder: "asc"
    };

    DialogCrudCtrlMixin($scope, {
      Resource,
      gridName: "usersGrid",
      templateUrl: "/user/formTemplate",
      beforeEdit(record) {
        // saves data from server to compare retrieved data and data that will be send to the server
        $scope.tzShowCase = angular.copy(record);
        const user = angular.copy(record);
        // convert `Contact.type` enum field to the string
        user.contact.type = record.contact.type != null ? record.contact.type.name : undefined;
        return user;
      }
    }
    );

    // UI-grid test example
    const listPath = pathWithContext("/user/list?format=json");

    const paginationOptions = {
      pageNumber: 1,
      pageSize: 20,
      sort: null,
      order: null
    };

    $scope.gridOptionsUI = {
      enableColumnResizing: true,
      columnDefs: this.UiGridColModel(),
      useExternalSorting: true,
      paginationPageSizes: [10, 20, 50],
      paginationPageSize: 20,
      useExternalPagination: true,
    };

    $scope.gridOptionsUI.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
      $scope.gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
        console.log(rowEntity);
        $http.post(pathWithContext(`/user/update/${rowEntity.id}`), rowEntity);
        return alert('Column: ' + colDef.name + ' ID: ' + rowEntity.id);
      });
      $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
        if (sortColumns.length === 0) {
          paginationOptions.sort = null;
          paginationOptions.order = null;
        } else {
          paginationOptions.sort = sortColumns[0].field;
          paginationOptions.order = sortColumns[0].sort.direction;
        }
        return getPage();
      });
      return gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
        paginationOptions.pageNumber = newPage;
        paginationOptions.pageSize = pageSize;
        return getPage();
      });
    };

    var getPage = function(params) {
      if (params == null) { params = {}; }
      params.page = paginationOptions.pageNumber;
      params.max = paginationOptions.pageSize;
      params.sort = paginationOptions.sort;
      params.order = paginationOptions.order;
      return $http({url:listPath, type:'GET', params}).success(function(resp) {
        $scope.gridOptionsUI.totalItems = resp.records;
        return $scope.gridOptionsUI.data = resp.rows;
      });
    };

    getPage();
  }

  colModel() {
    return [
      { name: "id", label: "ID", width: 30, fixed: true },
      { name: "contact.name", label: "Contact Name", width: 100, fixed: true, formatter: "editActionLink" },
      { name: "contact.email", label: "Contact Email", width: 70, align: "right", formatter: "email" },
      { name: "login", label: "Login", width: 70 },
      { name: "activeDate", label: "Active Date", width: 70, formatter: cellVal => this.$filter("date")(cellVal) },
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ];
  }
  link(fieldName) {
    return "<a ng-click='grid.appScope.editRecord(row.entity[\"id\"])'  href='#'>{{COL_FIELD}}</a>";
  }

  UiGridColModel() {
    return [
      { field: "id", name: "ID", width: 30, enableColumnResizing: false, cellFilter: "number"},
      { field: "contact.name", name: "Contact Name", cellTemplate: this.link()},
      { field: "contact.email", name: "Contact Email",  align: "right" },
      // grid.appScope - the way how we can get apllication scope. For some reason doesn't work for composit fields, for example "contact.name"
      { field: "login", name: "Login", cellTemplate: this.link()},
      { field: "activeDate", name: "Active Date",  cellFilter: "agDate" },
      //just an example how we can use cellTemplate, in this case it would be better to create an filter
      { field: "inactive", name: "Inactive", align: "center", cellTemplate: "<span>{{row.entity[col.field]?'+':'-'}}</span>" }
    ];
  }
}
ListCtrl.initClass();

angular.module("angleGrinder")
  .controller("user.ListCtrl", ListCtrl);
