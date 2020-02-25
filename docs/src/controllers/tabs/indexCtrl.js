import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'
import _ from 'lodash'

export default class IndexCtrl extends BaseCtrl {
  static initClass() {

    this.register("exampleApp", "tabs.IndexCtrl");
    this.inject("$scope", "$templateCache",  "$log");
  }

  initialize() {
    this.expose(this.$scope, "save");

    // remove tab templates from the cache
    _.each(["_first", "_second", "_third"], name => {
      return this.$templateCache.remove(`templates/tabs/${name}.html`);
    });

    this.$scope.second = {title: "The Second Tab"};
    this.$scope.third = {title: "The Third Tab"};
    this.$scope.item = {name: "Foo"};
    this.$scope.birthDate = new Date();

    this.$scope.user = {};
    this.$scope.user.birthDate = "2015-05-22T23:00:00+0200";
    return this.$scope.price = 99990001.98001;
  }

  save(item, form) {
    return this.$log.debug("[tabs] saving", item);
  }
}

