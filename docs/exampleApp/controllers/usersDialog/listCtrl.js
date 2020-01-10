/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class IndexCtrl extends BaseCtrl {
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
      templateUrl: "templates/usersDialog/form.html"
    }
    );

    return this.MassUpdateMixin(this.$scope, {
      templateUrl: "/templates/users/massUpdateForm.html",
      controller: "users.MassUpdateFormCtrl",
      gridName: "usersGrid"
    }
    );
  }
}
IndexCtrl.initClass();
