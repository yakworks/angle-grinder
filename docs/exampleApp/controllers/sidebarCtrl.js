/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class SidebarCtrl extends BaseCtrl {
  static initClass() {
  
    this.register("exampleApp");
    this.inject("$rootScope", "$scope", "$location", "$routeParams", "scrollTo");
  }

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
SidebarCtrl.initClass();
