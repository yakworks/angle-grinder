org = angular.module "admin.orgTabs", [
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
        templateUrl: "../templates/tabbedOrg/list.html"
        controller: "tabbedOrg.ListCtrl"

      .state "create",
        url: "/create"
        templateUrl: "../templates/org/form.html"
        controller: "tabbedOrg.FormCtrl"
        resolve: org: ["Resource", (Resource) -> new Resource()]

      .state "edit",
        url: "/:id/edit"
        templateUrl: "../templates/org/form.html"
        controller: "tabbedOrg.FormCtrl"
        resolve: org: [
          "$stateParams", "resourceResolver", ($stateParams, resourceResolver) ->
            resourceResolver($stateParams.id)
        ]

      .state "show",
        url: "/:id"
        templateUrl: "../templates/tabbedOrg/show.html"
        controller: "tabbedOrg.ShowCtrl"
        resolve: org: [
          "$stateParams", "resourceResolver", ($stateParams, resourceResolver) ->
            resourceResolver($stateParams.id)
        ]
]
