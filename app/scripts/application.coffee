# The entry point for the application

$ ->
  $("#topbar").load "views/partials/navbar_top.html"

app = angular.module("angleGrinder", [
  "angleGrinder.directives"
  "angleGrinder.services"
  "angleGrinder.controllers"
  "ui.bootstrap"
])

app.config [
  "$provide", "$routeProvider", ($provide, $routeProvider) ->
    $provide.value("alertTimeout", 3000)

    $routeProvider
      .when "/",
        templateUrl: "views/gridz_with_toolbar.html",
        controller: "GridzWithToolbarCtrl"

      .when "/simple_jqgrid",
        templateUrl: "views/simple_jqgrid.html",
        controller: "SimpleJqGridCtrl"

      .when "/simple_gridz",
        templateUrl: "views/simple_gridz.html",
        controller: "SimpleGridzCtrl"

      .when "/jqgrid_basic",
        templateUrl: "views/jqgrid_basic.html",
        controller: "JqGridBasicCtrl"

      .when "/ag_grid_directive",
        templateUrl: "views/ag_grid_directive.html",
        controller: "AgGridDirectiveCtrl"

      .otherwise redirectTo: "/"
]
