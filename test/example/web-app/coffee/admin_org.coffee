org = angular.module "admin.org", ["angleGrinder"]

org.config [
  "$provide", "$routeProvider", "$httpProvider", ($provide, $routeProvider) ->

    $routeProvider
      .when "/",
        templateUrl: "../templates/org/list.html"
        controller: "org.ListCtrl"

      .when "/:id",
        templateUrl: "../templates/org/show.html"
        controller: "org.ShowCtrl"
        resolve: org: [
          "$route", "resourceResolver", ($route, resourceResolver) ->
            resourceResolver($route.current.params.id)
        ]

      .otherwise redirectTo: "/"
]
