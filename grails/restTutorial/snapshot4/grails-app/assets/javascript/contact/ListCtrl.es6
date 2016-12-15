class ListCtrl {
  constructor($scope, Resource, DialogCrudCtrlMixin, pathWithContext,RoutesServ) {
    var colModel = [
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

    $scope.gridOptions = {
      path: "/api/contact",
      colModel: colModel,
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

    $scope.save = (contact) => {
      contact.save().then(function (resp) {
        console.log(resp);
      })
    };
  }
}
ListCtrl.$inject = ['$scope', 'Resource', 'DialogCrudCtrlMixin', 'pathWithContext',  "RoutesServ"];
