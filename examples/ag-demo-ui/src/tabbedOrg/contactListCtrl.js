/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class ContactListCtrl {
  static initClass() {
  
    this.$inject = ["$scope", "resourceBuilder", "DialogCrudCtrlMixin", ];
  }
  constructor($scope, resourceBuilder, DialogCrudCtrlMixin) {
    // Create resource for the users (contacts)
    const Users = resourceBuilder("/user");

    $scope.gridOptions = {
      path: `/org/listUsers/${$scope.org.id}?format=json`,
      colModel: this.colModel(),
      multiselect: false, // turn off multiselect
      shrinkToFit: true, // makes columns fit to width
      autowidth: true,
      sortname: "login",
      sortorder: "asc"
    };

    DialogCrudCtrlMixin($scope, {
      Resource: Users,
      gridName: "contactsGrid",
      templateUrl: "/user/formTemplate",
      beforeCreate(user) {
        user.contact = {
          org: $scope.org,
          type: "CUSTOMER"
        };
        return user;
      }
    }
    );
  }

  colModel() {
    return [
      { name: "id", label: "ID", width: 30 },
      { name: "contact.name", sortable: false, label: "Contact Name", width: 100, formatter: "editActionLink" },
      { name: "contact.email", sortable: false, label: "Contact Email", width: 70, align: "right", formatter: "email" },
      { name: "login", label: "Login", width: 70 },
      { name: "inactive", label: "Inactive", width: 30, align: "center", formatter: "okIcon" }
    ];
  }
}
ContactListCtrl.initClass();

angular.module("angleGrinder")
  .controller("tabbedOrg.ContactListCtrl", ContactListCtrl);
