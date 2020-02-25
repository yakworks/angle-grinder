import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'

export default class MassUpdateFormCtrl extends BaseCtrl {
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
