# Routes for the application

app = angular.module("angleGrinder")
app.config [
  "$provide", "$routeProvider", "$httpProvider", ($provide, $routeProvider, $httpProvider) ->
    $httpProvider.responseInterceptors.push("httpErrorsInterceptor")

    $routeProvider
      .when "/list",
        templateUrl: "templates/list.html"
        controller: "ListCtrl"

      .when "/users_list",
        templateUrl: "templates/usersList.html"
        controller: "UsersListCtrl"

      .when "/users",
        templateUrl: "templates/users/list.html"
        controller: "users.ListCtrl"

      .when "/users/create",
        templateUrl: "templates/users/form.html"
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
        templateUrl: "templates/users/form.html"
        controller: "users.FormCtrl"
        resolve: user: [
          "$route", "userResolver", ($route, userResolver) ->
            userResolver($route.current.params.id)
        ]

      .otherwise redirectTo: "/users_list"
]
