# The entry point for the application

app = angular.module("angleGrinder", [
  "angleGrinder.common"
  "angleGrinder.gridz"
  "angleGrinder.forms"
  "angleGrinder.alerts"
  "angleGrinder.dataGenerator"
  "angleGrinder.resources"
  "angleGrinder.spinner"
])

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
        templateUrl: "templates/users/edit.html"
        controller: "users.FormCtrl"
        resolve: user: ["Users", (Users) -> new Users()]

      .when "/users/:id",
        templateUrl: "templates/users/show.html"
        controller: "users.ShowCtrl"
        resolve: user: [
          "$route", "userResolver", ($route, userResolver) ->
            userResolver($route.current.params.id)
        ]

      .when "/users/:id/edit",
        templateUrl: "templates/users/edit.html"
        controller: "users.FormCtrl"
        resolve: user: [
          "$route", "userResolver", ($route, userResolver) ->
            userResolver($route.current.params.id)
        ]

      .otherwise redirectTo: "/"
]

# Sample `pathWithContext` configuration block
app.config [
  "pathWithContextProvider", (pathWithContextProvider) ->
    contextPath = $("body").data("context-path")
    pathWithContextProvider.setContextPath(contextPath) if contextPath?
]

# Intercepts all HTTP errors and dislays a flash message
app.factory "httpErrorsInterceptor", [
  "$injector", "$q", "alerts", ($injector, $q, alerts) ->
    (promise) ->
      $http = $injector.get("$http")

      onError = (response) ->
        errorMessage = response.data?.error || "Unexpected HTTP error"

        # skip validation errors
        alerts.error(errorMessage) if response.status isnt 422

        $q.reject(response)

      promise.then(null, onError)
]
