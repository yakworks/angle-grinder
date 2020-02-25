import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'

export default class SearchFormCtrl extends BaseCtrl {
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

