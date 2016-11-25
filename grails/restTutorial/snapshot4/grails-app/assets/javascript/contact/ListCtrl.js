var ListCtrl = (function() {
  ListCtrl.$inject = ["$scope", "Resource", "DialogCrudCtrlMixin", "pathWithContext"];

  function ListCtrl($scope, Resource, DialogCrudCtrlMixin, pathWithContext) {
    $scope.gridOptions = {
      path: "/api/contacts",
      colModel: colModel(),
      multiselect: true,
      shrinkToFit: true,
      sortname: "id",
      sortorder: "asc",
      rowNum: 5,
      rowList: [5, 10, 20, 100]
    };

    DialogCrudCtrlMixin($scope, {
      Resource: Resource,
      gridName: "contactGrid",
      templateUrl: pathWithContext("contact/form")
    });

    $scope.save = function(contact){
      contact.save().then(function(resp){
        console.log(resp);
      })
    }

  }

  var colModel = function() {
    return [
      {
        name: "id",
        label: "ID"
      }, {
        name: "firstName",
        label: "Name"
      }, {
        name: "lastName",
        label: "Last Name"
      }, {
        name: "email",
        label: "Email"
      }, {
        name: "inactive",
        label: "Inactive"
      }
    ];
  };

  return ListCtrl;

})();

angular.module("contactApp").controller("ListCtrl", ListCtrl);
