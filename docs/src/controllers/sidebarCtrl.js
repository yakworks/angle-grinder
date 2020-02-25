import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'

export default class SidebarCtrl extends BaseCtrl {

  initialize() {
    this.expose(this.$scope, "section");

    return this.$rootScope.$on("$routeChangeSuccess", () => {
      const id = this.$routeParams.scrollTo;
      return this.scrollTo(id);
    });
  }

  section() {
    const path = this.$location.path().replace(/^\/+/, "");
    const section = path.split("/")[0];

    switch (section) {
      case "": return "angleGrinder";
      case "documentation": return "documentation";
      case "examples": return "examples";
      default: return "angleGrinder";
    }
  }
}

SidebarCtrl.inject("$rootScope", "$scope", "$location", "$routeParams", "scrollTo")
