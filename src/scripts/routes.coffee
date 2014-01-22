# Routes for the application

app = angular.module("angleGrinder")
app.config [
  "$provide", "$routeProvider", "$httpProvider", ($provide, $routeProvider, $httpProvider) ->
    $httpProvider.responseInterceptors.push("httpErrorsInterceptor")

    $routeProvider
      .when "/",
        templateUrl: "templates/angleGrinder.html"

      .when "/documentation",
        templateUrl: "templates/documentation.html"

      .when "/examples",
        redirectTo: "/examples/gridExample"

      .when "/examples/gridExample",
        templateUrl: "templates/gridExample/list.html"
        controller: "gridExample.ListCtrl"

      .when "/examples/usersDialog",
        templateUrl: "templates/usersDialog/list.html"
        controller: "usersDialog.ListCtrl"

      .when "/examples/users",
        templateUrl: "templates/users/list.html"
        controller: "users.ListCtrl"

      .when "/examples/users/create",
        templateUrl: "templates/users/form.html"
        controller: "users.FormCtrl"
        resolve: user: ["Users", (Users) -> new Users()]

      .when "/examples/users/:id",
        templateUrl: "templates/users/show.html"
        controller: "users.ShowCtrl"
        resolve: user: [
          "$route", "userResolver", ($route, userResolver) ->
            userResolver($route.current.params.id)
        ]

      .when "/examples/users/:id/edit",
        templateUrl: "templates/users/form.html"
        controller: "users.FormCtrl"
        resolve: user: [
          "$route", "userResolver", ($route, userResolver) ->
            userResolver($route.current.params.id)
        ]

      .when "/examples/fileUpload",
        templateUrl: "templates/fileUpload/index.html"
        controller: "fileUpload.IndexCtrl"

      .when "/examples/tabs",
        templateUrl: "templates/tabs/index.html"
        controller: "tabs.IndexCtrl"

      .when "/examples/panels",
        templateUrl: "templates/panels/index.html"
        controller: "panels.IndexCtrl"

      .otherwise redirectTo: "/"
]
