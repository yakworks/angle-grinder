class SidebarCtrl

  @$inject = ["$rootScope", "$scope", "$location", "$routeParams", "scrollTo"]
  constructor: ($rootScope, $scope, $location, $routeParams, scrollTo) ->

    $rootScope.$on "$routeChangeSuccess", ->
      id = $routeParams.scrollTo
      scrollTo(id)

    $scope.section = ->
      path = $location.path().replace /^\/+/, ""
      section = path.split("/")[0]

      switch section
        when "" then "angleGrinder"
        when "documentation" then "documentation"
        when "examples" then "examples"
        else "angleGrinder"

angular.module("angleGrinder")
  .controller("SidebarCtrl", SidebarCtrl)
