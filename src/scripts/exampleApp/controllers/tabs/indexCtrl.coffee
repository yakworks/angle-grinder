class IndexCtrl extends BaseCtrl

  @register "exampleApp", "tabs.IndexCtrl"
  @inject "$scope", "$templateCache",  "$log"

  initialize: ->
    @expose @$scope, "save"

    # remove tab templates from the cache
    _.each ["_first", "_second", "_third"], (name) =>
      @$templateCache.remove "templates/tabs/#{name}.html"

    @$scope.second = title: "The Second Tab"
    @$scope.third = title: "The Third Tab"
    @$scope.item = name: "Foo"

  save: (form, item) ->
    return if form.$invalid
    @$log.debug "[tabs] saving", item
