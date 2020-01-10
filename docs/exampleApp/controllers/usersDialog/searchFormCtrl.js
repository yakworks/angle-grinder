/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class SearchFormCtrl extends BaseCtrl {
  static initClass() {
  
    this.register("exampleApp", "usersDialog.SearchFormCtrl");
    this.inject("$scope");
  }

  initialize() {

    return this.$scope.userTypeSelectOptions = {
      multiple: true,
      simple_tags: true,
      tags: ["admin", "customer"]
    };
  }
}
SearchFormCtrl.initClass();

