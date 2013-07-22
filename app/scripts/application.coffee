# The entry point for the application

app = angular.module("angleGrinder", [
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
        templateUrl: "templates/gridz_with_toolbar.html",
        controller: "GridzWithToolbarCtrl"

      .when "/simple_jqgrid",
        templateUrl: "templates/simple_jqgrid.html",
        controller: "SimpleJqGridCtrl"

      .when "/simple_gridz",
        templateUrl: "templates/simple_gridz.html",
        controller: "SimpleGridzCtrl"

      .when "/jqgrid_basic",
        templateUrl: "templates/jqgrid_basic.html",
        controller: "JqGridBasicCtrl"

      .when "/ag_grid_directive",
        templateUrl: "templates/ag_grid_directive.html",
        controller: "AgGridDirectiveCtrl"

      .when "/server_side",
        templateUrl: "templates/server_side.html",
        controller: "ServerSideCtrl"

      .otherwise redirectTo: "/"
]

# Intercepts all HTTP errors and dislays a flash message
app.factory "httpErrorsInterceptor", [
  "$injector", "$q", "alerts", ($injector, $q, alerts) ->
    (promise) ->
      $http = $injector.get("$http")

      onError = (response) ->
        errorMessage = response.data?.error || "Unexpected HTTP error"

        # TODO temporary skip validation errors
        alerts.error(errorMessage) if response.status isnt 422

        $q.reject(response)

      promise.then(null, onError)
]
