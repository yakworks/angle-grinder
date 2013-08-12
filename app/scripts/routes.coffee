# Routes for the application

app = angular.module("angleGrinder")
app.config [
  "$provide", "$routeProvider", "$httpProvider", ($provide, $routeProvider, $httpProvider) ->
    $httpProvider.responseInterceptors.push("httpErrorsInterceptor")

    $routeProvider
      .when "/",
        templateUrl: "templates/gridz_with_toolbar.html"
        controller: "GridzWithToolbarCtrl"

      .when "/simple_jqgrid",
        templateUrl: "templates/simple_jqgrid.html"
        controller: "SimpleJqGridCtrl"

      .when "/simple_gridz",
        templateUrl: "templates/simple_gridz.html"
        controller: "SimpleGridzCtrl"

      .when "/jqgrid_basic",
        templateUrl: "templates/jqgrid_basic.html"
        controller: "JqGridBasicCtrl"

      .when "/ag_grid_directive",
        templateUrl: "templates/ag_grid_directive.html"
        controller: "AgGridDirectiveCtrl"

      .when "/server_side",
        templateUrl: "templates/server_side.html"
        controller: "ServerSideCtrl"

      .when "/users",
        templateUrl: "templates/users/list.html"
        controller: "users.ListCtrl"

      .when "/users/create",
        templateUrl: "templates/users/form.html"
        controller: "users.FormCtrl"
        resolve: user: ["Users", (Users) -> new Users()]

      .when "/users/:id",
        templateUrl: "templates/users/show.html"
        controller: "users.FormCtrl"
        resolve: user: [
          "$route", "userResolver", ($route, userResolver) ->
            userResolver($route.current.params.id)
        ]

      .when "/users/:id/edit",
        templateUrl: "templates/users/form.html"
        controller: "users.FormCtrl"
        resolve: user: [
          "$route", "userResolver", ($route, userResolver) ->
            userResolver($route.current.params.id)
        ]

      .otherwise redirectTo: "/"
]
