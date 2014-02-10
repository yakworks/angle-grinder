# Routes for the application

app = angular.module("exampleApp")

app.config [
  "$stateProvider", "$urlRouterProvider", "$httpProvider",
  ($stateProvider, $urlRouterProvider, $httpProvider) ->
    $httpProvider.responseInterceptors.push("httpErrorsInterceptor")

    # For any unmatched url, redirect to the root page
    $urlRouterProvider.otherwise "/"

    $stateProvider
      # Documentation section
      .state "docs",
        abstract: true
        templateUrl: "templates/docs.html"

      .state "docs.develop",
        url: "/"
        views:
          "": templateUrl: "templates/docs/develop.html"
          "sidebar": templateUrl: "templates/docs/sidebar/develop.html"

      .state "docs.api",
        url: "/docs"
        views:
          "": templateUrl: "templates/docs/api.html"
          "sidebar": { templateUrl: "templates/docs/sidebar/api.html" }

      # Examples section
      .state "examples",
        abstract: true
        url: "/examples"
        templateUrl: "templates/examples.html"

      .state "examples.gridExample",
        url: "/gridExample"
        templateUrl: "templates/examples/gridExample/list.html"
        controller: "gridExample.ListCtrl"

      .state "examples.usersDialog",
        url: "/usersDialog"
        templateUrl: "templates/examples/usersDialog/list.html"
        controller: "usersDialog.ListCtrl"

      .state "examples.users",
        url: "/users"
        abstract: true
        template: "<ui-view/>"

      .state "examples.users.list",
        url: ""
        templateUrl: "templates/examples/users/list.html"
        controller: "users.ListCtrl"

      .state "examples.users.create",
        url: "/create"
        templateUrl: "templates/examples/users/form.html"
        controller: "users.FormCtrl"
        resolve: user: ["Users", (Users) -> new Users()]

      .state "examples.users.edit",
        url: "/:id/edit",
        templateUrl: "templates/examples/users/form.html"
        controller: "users.FormCtrl"
        resolve: user: [
          "$stateParams", "userResolver", ($stateParams, userResolver) ->
            userResolver($stateParams.id)
        ]

      .state "examples.users.show",
        url: "/:id?ids",
        templateUrl: "templates/examples/users/show.html"
        controller: "users.ShowCtrl"
        resolve: user: [
          "$stateParams", "userResolver", ($stateParams, userResolver) ->
            userResolver($stateParams.id)
        ]

      .state "examples.fileUpload",
        url: "/fileUpload"
        templateUrl: "templates/examples/fileUpload/index.html"
        controller: "fileUpload.IndexCtrl"

      .state "examples.panels",
        url: "/panels"
        templateUrl: "templates/examples/panels/index.html"
        controller: "panels.IndexCtrl"
]
