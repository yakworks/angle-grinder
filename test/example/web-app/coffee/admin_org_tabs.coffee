org = angular.module "admin.orgTabs", ["admin.org"]

org.config [
  "$routeProvider", ($routeProvider) ->

    $routeProvider
      .when "/:id",
        templateUrl: "../templates/org_tabs/show.html"
        controller: "orgTabs.ShowCtrl"
        resolve: org: [
          "$route", "resourceResolver", ($route, resourceResolver) ->
            resourceResolver($route.current.params.id)
        ]
]
