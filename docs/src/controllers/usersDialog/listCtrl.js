import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'

export default class IndexCtrl extends BaseCtrl {
  static initClass() {

    this.register("exampleApp", "usersDialog.ListCtrl");
    this.inject("$scope", "usersDialogGrid", "Users", "DialogCrudCtrlMixin", "MassUpdateMixin");
  }

  initialize() {
    // Initially hide the search form
    this.$scope.showSearchForm = false;

    // by default filter by `customers`
    this.$scope.defaultFilters = {contact: {type: "customer"}};
    this.$scope.filters = angular.copy(this.$scope.defaultFilters);

    // initialize the grid
    this.$scope.gridOptions = this.usersDialogGrid();

    this.DialogCrudCtrlMixin(this.$scope, {
      Resource: this.Users,
      gridName: "usersGrid",
      template: "partials/usersDialog/form.html"
    });

    return this.MassUpdateMixin(this.$scope, {
      templateUrl: "/partials/users/massUpdateForm.html",
      controller: "users.MassUpdateFormCtrl",
      gridName: "usersGrid"
    });

  }

}
