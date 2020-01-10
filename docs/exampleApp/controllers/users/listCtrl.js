/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class ListCtrl extends BaseCtrl {
  static initClass() {
  
    this.register("exampleApp", "users.ListCtrl");
    this.inject("$scope", "usersGrid", "Users", "MassUpdateMixin", "SinglePageCrudCtrlMixin");
  }

  initialize() {
    this.$scope.showGrid = true;

    // initialize the grid
    this.$scope.gridOptions = this.usersGrid();

    this.SinglePageCrudCtrlMixin(this.$scope, {
      Resource: this.Users,
      resourcePath: "/users",
      gridName: "usersGrid"
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
ListCtrl.initClass();
