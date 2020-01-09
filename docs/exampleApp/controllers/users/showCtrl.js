/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class ShowCtrl extends BaseCtrl {
  static initClass() {
  
    this.register("exampleApp", "users.ShowCtrl");
    this.inject("$scope", "$location", "exampleGrid", "sampleData", "user");
  }

  initialize() {
    this.expose(this.$scope, "user", "delete");

    // generate the sample data
    const sampleData = this.sampleData.generate(100);

    // initialize the grid with generated data
    return this.$scope.gridOptions = this.exampleGrid({
      data: sampleData,
      shrinkToFit: true,
      multiselect: false,
      actionPopup: false
    });
  }

  delete(user) {
    const promise = user.delete().$promise;
    return promise.then(() => this.$location.path("/examples/users"));
  }
}
ShowCtrl.initClass();
