import angular from "angular";
import angleGrinder from '~/angle-grinder'

const MOD_NAME = 'admin.org'
const org = angular.module(MOD_NAME, [angleGrinder]);
org.config([
  "$routeProvider", $routeProvider => $routeProvider
    .when("/", {
      templateUrl: "../templates/org/list.html",
      controller: "org.ListCtrl"
    }).when("/create", {
      templateUrl: "../templates/org/form.html",
      controller: "org.FormCtrl",
      resolve: { org: ["Resource", Resource => new Resource()]
      }
    })

    .when("/:id", {
      templateUrl: "../templates/org/show.html",
      controller: "org.ShowCtrl",
      resolve: { org: [
          "$route", "resourceResolver", ($route, resourceResolver) => resourceResolver($route.current.params.id)
        ]
      }
    })

    .when("/:id/edit", {
      templateUrl: "../templates/org/form.html",
      controller: "org.FormCtrl",
      resolve: { org: [
          "$route", "resourceResolver", ($route, resourceResolver) => resourceResolver($route.current.params.id)
        ]
      }
    })

    .otherwise({redirectTo: "/"})
]);
export default MOD_NAME
