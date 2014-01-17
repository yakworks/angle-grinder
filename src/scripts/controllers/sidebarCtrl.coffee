class SidebarCtrl

  @$inject = ["$rootScope", "$scope", "$location", "$stateParams", "scrollTo"]
  constructor: ($rootScope, $scope, $location, $stateParams, scrollTo) ->

    # TODO fix it
    # TODO refactor it with ui-route
    $rootScope.$on "$routeChangeSuccess", ->
      id = $stateParams.scrollTo
      scrollTo(id)

    # TODO refactor it with ui-route
    $scope.section = ->
      path = $location.path().replace /^\/+/, ""
      section = path.split("/")[0]

      switch section
        when "documentation" then "documentation"
        when "examples" then "examples"
        else "develop"

angular.module("angleGrinder.examples")
  .controller("SidebarCtrl", SidebarCtrl)
