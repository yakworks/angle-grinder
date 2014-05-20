class IndexCtrl extends BaseCtrl

  @register "exampleApp", "tabs.IndexCtrl"
  @inject "$scope", "$templateCache", "$routeParams", "$log"

  initialize: ->
    @expose @$scope, "isTabActive", "save"

    # remove tab templates from the cache
    _.each ["_first", "_second", "_third"], (name) =>
      @$templateCache.remove "templates/tabs/#{name}.html"

    @$scope.title = "Tabs with lazy loaded templates"

    @$scope.second = title: "The Second Tab"
    @$scope.third = title: "The Third Tab"
    @$scope.item = name: "Foo"

  # return true when a tab with the given name should be activated by default
  isTabActive: (name) -> @$routeParams.tab is name

  save: (form, item) ->
    return if form.$invalid
    @$log.debug "[tabs] saving", item
