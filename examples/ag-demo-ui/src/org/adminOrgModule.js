import angular from "angular";
import angleGrinder from '~/angle-grinder'

const MOD_NAME = 'admin.org'
export default MOD_NAME
var org = angular.module(MOD_NAME, [angleGrinder]);
angular.module('ag.resourceSupport').value('BasePath', '/org')
org.config([
  "$routeProvider", $routeProvider => $routeProvider
  .when("/", {
    template: require("../templates/org/list.html"),
    controller: "org.ListCtrl"
  }).when("/create", {
    template: require("../templates/org/form.html"),
    controller: "org.FormCtrl",
    resolve: { org: ["Resource", Resource => new Resource()]
  }
  })

  .when("/:id", {
    template: require("../templates/org/show.html"),
    controller: "org.ShowCtrl",
    resolve: { org: [
      "$route", "resourceResolver", ($route, resourceResolver) => resourceResolver($route.current.params.id)
    ]
  }
  })

  .when("/:id/edit", {
    template: require("../templates/org/form.html"),
    controller: "org.FormCtrl",
    resolve: { org: [
      "$route", "resourceResolver", ($route, resourceResolver) => resourceResolver($route.current.params.id)
    ]
  }
  })

  .otherwise({redirectTo: "/"})
]);
