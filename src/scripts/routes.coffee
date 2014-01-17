# Routes for the application

app = angular.module("angleGrinder")
app.config [
  "$stateProvider", "$urlRouterProvider", "$httpProvider",
  ($stateProvider, $urlRouterProvider, $httpProvider) ->
    $httpProvider.responseInterceptors.push("httpErrorsInterceptor")

    # For any unmatched url, redirect to the root page
    $urlRouterProvider.otherwise "/"

    $stateProvider
      .state "docs",
        abstract: true
        template: "<ui-view/>"

      .state "docs.develop",
        url: "/"
        templateUrl: "templates/develop.html"

      .state "docs.api",
        url: "/documentation"
        templateUrl: "templates/api.html"

      .state "examples",
        abstract: true
        url: "/examples"
        template: "<ui-view/>"

      .state "examples.gridExample",
        url: "/gridExample"
        templateUrl: "templates/gridExample/list.html"
        controller: "gridExample.ListCtrl"

      .state "examples.usersDialog",
        url: "/usersDialog"
        templateUrl: "templates/usersDialog/list.html"
        controller: "usersDialog.ListCtrl"

      .state "examples.users",
        url: "/users"
        abstract: true
        template: "<ui-view/>"

      .state "examples.users.list",
        url: ""
        templateUrl: "templates/users/list.html"
        controller: "users.ListCtrl"

      .state "examples.users.create",
        url: "/create"
        templateUrl: "templates/users/form.html"
        controller: "users.FormCtrl"
        resolve: user: ["Users", (Users) -> new Users()]

      .state "examples.users.edit",
        url: "/:id/edit",
        templateUrl: "templates/users/form.html"
        controller: "users.FormCtrl"
        resolve: user: [
          "userResolver", "$stateParams", (userResolver, $stateParams) ->
            userResolver($stateParams.id)
        ]

      .state "examples.users.show",
        url: "/:id?ids",
        templateUrl: "templates/users/show.html"
        controller: "users.ShowCtrl"
        resolve: user: [
          "userResolver", "$stateParams", (userResolver, $stateParams) ->
            userResolver($stateParams.id)
        ]

      .state "examples.fileUpload",
        url: "/fileUpload"
        templateUrl: "templates/fileUpload/index.html"
        controller: "fileUpload.IndexCtrl"

      .state "examples.panels",
        url: "/panels"
        templateUrl: "templates/panels/index.html"
        controller: "panels.IndexCtrl"
]
