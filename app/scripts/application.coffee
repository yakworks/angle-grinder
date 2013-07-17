# The entry point for the application

$ ->
  # Load the navbar template
  $("#topbar").load "/_navbar_top.html"

app = angular.module("angleGrinder", [
  "angleGrinder.templates"
  "angleGrinder.gridz"
  "angleGrinder.forms"
  "angleGrinder.alerts"
  "angleGrinder.dataGenerator"
  "angleGrinder.resources"
])

app.config [
  "$provide", "$routeProvider", ($provide, $routeProvider) ->
    $provide.value("alertTimeout", 3000)

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
