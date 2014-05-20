class SidebarCtrl extends BaseCtrl

  @register "exampleApp"
  @inject "$rootScope", "$scope", "$location", "$routeParams", "scrollTo"

  initialize: ->
    @expose @$scope, "section"

    @$rootScope.$on "$routeChangeSuccess", =>
      id = @$routeParams.scrollTo
      @scrollTo(id)

  section: ->
    path = @$location.path().replace /^\/+/, ""
    section = path.split("/")[0]

    switch section
      when "" then "angleGrinder"
      when "documentation" then "documentation"
      when "examples" then "examples"
      else "angleGrinder"
