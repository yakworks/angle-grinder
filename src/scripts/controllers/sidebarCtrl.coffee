class SidebarCtrl

  @$inject = ["$scope", "$location"]
  constructor: ($scope, $location) ->

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
