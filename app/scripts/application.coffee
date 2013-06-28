# The entry point for the application

$ ->
  $("#topbar").load "docs/navbar-top.html"
  $("#sidebar").load "docs/gridz-sidebar.html"

app = angular.module("angleGrinder", ["angleGrinder.controllers"])
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

      .otherwise redirectTo: "/"
]
