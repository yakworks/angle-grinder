org = angular.module "tutorial"

org.config [
  "$routeProvider", "ResourceTemplateServ", ($routeProvider, ResourceTemplateServ) ->
    orgTemplate = (path) -> ResourceTemplateServ("/org", path)
    templateUrl = (name) -> "#{orgTemplate("template")}?name=#{name}"

    $routeProvider
      .when "/",
        templateUrl: templateUrl "list"
        controller: "org.ListCtrl"

      .when "/create",
        templateUrl: templateUrl "form"
        controller: "org.FormCtrl"
        resolve: org: ["Resource", (Resource) -> new Resource()]

      .when "/:id",
        templateUrl: templateUrl "show"
        controller: "org.ShowCtrl"
        resolve: org: [
          "$route", "resourceResolver", ($route, resourceResolver) ->
            resourceResolver($route.current.params.id)
        ]

      .when "/:id/edit",
        templateUrl: templateUrl "form"
        controller: "org.FormCtrl"
        resolve: org: [
          "$route", "resourceResolver", ($route, resourceResolver) ->
            resourceResolver($route.current.params.id)
        ]

      .otherwise redirectTo: "/"
]
