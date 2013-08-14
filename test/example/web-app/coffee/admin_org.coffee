org = angular.module "admin.org", ["angleGrinder"]

org.config [
  "$provide", "$routeProvider", "$httpProvider", ($provide, $routeProvider) ->

    $routeProvider
      .when "/",
        templateUrl: "../templates/org/list.html"
        controller: "org.ListCtrl"

      .when "/create",
        templateUrl: "../templates/org/form.html"
        controller: "org.FormCtrl"
        resolve: org: ["Resource", (Resource) -> new Resource()]

      .when "/:id",
        templateUrl: "../templates/org/show.html"
        controller: "org.ShowCtrl"
        resolve: org: [
          "$route", "resourceResolver", ($route, resourceResolver) ->
            resourceResolver($route.current.params.id)
        ]

      .when "/:id/details",
        templateUrl: "../templates/org/show_details.html"
        controller: "org.ShowDetailsCtrl"
        resolve: org: [
          "$route", "resourceResolver", ($route, resourceResolver) ->
            resourceResolver($route.current.params.id)
        ]

      .when "/:id/edit",
        templateUrl: "../templates/org/form.html"
        controller: "org.FormCtrl"
        resolve: org: [
          "$route", "resourceResolver", ($route, resourceResolver) ->
            resourceResolver($route.current.params.id)
        ]

      .otherwise redirectTo: "/"
]
