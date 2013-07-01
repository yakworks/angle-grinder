# The entry point for the application

$ ->
  # TODO Create ng-views for these partials
  $("#topbar").load "views/navbar-top.html"
  $("#sidebar").load "views/gridz-sidebar.html"

app = angular.module("angleGrinder", ["angleGrinder.controllers", "angleGrinder.services"])
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

      .otherwise redirectTo: "/"
]
