org = angular.module "admin.org", [
  "angleGrinder"
]

org.config [
  "$stateProvider", "$urlRouterProvider",
  ($stateProvider, $urlRouterProvider) ->

    # For any unmatched url, redirect to the root page
    $urlRouterProvider.otherwise "/"

    $stateProvider
      .state "list",
        url: "/"
        templateUrl: "../templates/org/list.html"
        controller: "org.ListCtrl"

      .state "create",
        url: "/create"
        templateUrl: "../templates/org/form.html"
        controller: "org.FormCtrl"
        resolve: org: ["Resource", (Resource) -> new Resource()]

      .state "edit",
        url: "/:id/edit"
        templateUrl: "../templates/org/form.html"
        controller: "org.FormCtrl"
        resolve: org: [
          "$stateParams", "resourceResolver", ($stateParams, resourceResolver) ->
            resourceResolver($stateParams.id)
        ]

      .state "show",
        url: "/:id?ids",
        templateUrl: "../templates/org/show.html"
        controller: "org.ShowCtrl"
        resolve: org: [
          "$stateParams", "resourceResolver", ($stateParams, resourceResolver) ->
            resourceResolver($stateParams.id)
        ]

]
