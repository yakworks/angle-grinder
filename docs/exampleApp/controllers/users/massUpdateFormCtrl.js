/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class MassUpdateFormCtrl extends BaseCtrl {
  static initClass() {
  
    this.register("exampleApp", "users.MassUpdateFormCtrl");
    this.inject("$scope", "massUpdateFormCtrlMixin", "dialog", "Users", "selectedIds", "grid");
  }

  initialize() {

    this.massUpdateFormCtrlMixin(this.$scope, {
      dialog: this.dialog,
      Resource: this.Users,
      selectedIds: this.selectedIds,
      grid: this.grid
    }
    );

    // Assign default value for all records
    return this.$scope.records = {creditInfo: {allowance: 0}};
  }
}
MassUpdateFormCtrl.initClass();
