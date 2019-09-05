org = angular.module "admin.orgTabs", ["admin.org"]

org.config [
  "$routeProvider", ($routeProvider) ->

    $routeProvider
      .when "/",
        template: ""

      .when "/:id",
        # TODO use context path
        templateUrl: "../templates/tabbedOrg/show.html"
        controller: "tabbedOrg.ShowCtrl"
        resolve: org: [
          "$route", "resourceResolver", ($route, resourceResolver) ->
            resourceResolver($route.current.params.id)
        ]
]
