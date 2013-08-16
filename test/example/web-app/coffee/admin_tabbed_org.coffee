org = angular.module "admin.orgTabs", ["admin.org"]

org.config [
  "$routeProvider", ($routeProvider) ->

    $routeProvider
      .when "/:id",
        templateUrl: "../templates/tabbed_org/show.html"
        controller: "tabbedOrg.ShowCtrl"
        resolve: org: [
          "$route", "resourceResolver", ($route, resourceResolver) ->
            resourceResolver($route.current.params.id)
        ]
]
