/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const org = angular.module("admin.orgTabs", ["admin.org"]);

org.config([
  "$routeProvider", $routeProvider => $routeProvider
  .when("/",
    {template: ""})

  .when("/:id", {
    // TODO use context path
    templateUrl: "../templates/tabbedOrg/show.html",
    controller: "tabbedOrg.ShowCtrl",
    resolve: { org: [
      "$route", "resourceResolver", ($route, resourceResolver) => resourceResolver($route.current.params.id)
    ]
  }

  })
]);
