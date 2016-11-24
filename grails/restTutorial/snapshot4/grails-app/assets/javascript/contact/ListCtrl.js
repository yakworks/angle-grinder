var ListCtrl = (function() {
  ListCtrl.$inject = ["$scope", "Resource", "SinglePageCrudCtrlMixin", "MassUpdateMixin", "$filter"];

  function ListCtrl($scope, Resource, SinglePageCrudCtrlMixin, MassUpdateMixin, $filter) {
    $scope.gridOptions = {
      path: "/api/contacts",
      colModel: colModel(),
      multiselect: true,
      shrinkToFit: true,
      sortname: "id",
      sortorder: "asc",
      rowNum: 5,
      rowList: [5, 10, 20]
    };
  }

  var colModel = function() {
    return [
      {
        name: "id",
        label: "ID"
      }, {
        name: "firstName",
        label: "Name"
      }
    ];
  };

  return ListCtrl;

})();

angular.module("contactApp").controller("ListCtrl", ListCtrl);
